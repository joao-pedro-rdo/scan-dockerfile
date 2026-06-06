import * as core from "@actions/core";
import { promises as fs } from "fs";

import * as utils from "./utils";
import { GitHubActionsAdapter } from "./adapters/githubActions";
import { githubaActionsReporters } from "./reporters/githubaActionsReporters";
import { LR_001_dockerignore } from "./linterRules/LR_001_dockerignore";
import { LR_002_setWorkdir } from "./linterRules/LR_002_setWorkdir";
import { LR_007_dependencies_order } from "./linterRules/LR_007_dependencies_order";
import { LangchainService } from "./refactor/langChain";
import { LR_003_declarePortUsage } from "./linterRules/LR_003_declarePortUsage";
import { LR_004_user } from "./linterRules/LR_004_user";
import { LR_005_avoidPipUpgrade } from "./linterRules/LR_005_avoidPipUpgrade";
import { LR_006_joinRun } from "./linterRules/LR_006_joinRun";

import { LR_007_test } from "./linterRules/LR_007_test";
import { LangchainServiceTestLLM } from "./refactor/langChainTesteLLM";

import {
  SentinelApiService,
  SENTINEL_DEFAULT_RULE_IDS,
} from "./services/sentinelApiService";
import { SentinelUsageMetrics } from "./contracts/sentinelApiInterface";

// Initialize the GitHub Actions adapter with the provided token and workspace
async function run() {
  try {
    //TODO Verify if exists dockerfile in the workspace because if not exists, the action dont make sense
    const adapter = new GitHubActionsAdapter(
      core.getInput("GITHUB_TOKEN"),
      process.env.GITHUB_WORKSPACE || process.cwd()
    );

    let name_Dockerfile = core.getInput("NAME_DOCKERFILE");
    if (!name_Dockerfile) {
      name_Dockerfile = "Dockerfile";
    }

    // TODO: Verify if dockerfile exists in the workspace
    //! If cant search dockerfile in the workspace, the action broken

    const reporter = new githubaActionsReporters(adapter);
    // const listIssue = await adapter.listIssues();
    // console.log("List of issues:", listIssue);

    reporter.startTable();

    console.log("Starting the scan-dockerfile action...");

    console.log("teste of new issue");
    const lr_001 = new LR_001_dockerignore(adapter, reporter);
    await lr_001.execute();

    console.log("teste of LR_002");
    const lr_002 = new LR_002_setWorkdir(adapter, reporter);
    await lr_002.execute(name_Dockerfile);

    console.log("teste of LR_003");

    const lr_003 = new LR_003_declarePortUsage(adapter, reporter);
    await lr_003.execute(name_Dockerfile);

    console.log("teste of LR_004");
    const lr_004 = new LR_004_user(adapter, reporter);
    await lr_004.execute(name_Dockerfile);

    console.log("teste of LR_005");
    const lr_005 = new LR_005_avoidPipUpgrade(adapter, reporter);
    await lr_005.execute(name_Dockerfile);

    // ─────────────────────────────────────────────────────────────────────
    // LR_006 / LR_007: detection only. Refactoring is now performed by the
    // SentinelCI API (Agno multi-agent). These rules detect the violation and
    // register the agent id; the API does the actual fix.
    //
    // The LangChain refactoring is kept for historical comparison (TCC):
    // pass a LangchainService to LR_006/LR_007 to re-enable the legacy path.
    // Legacy wiring (preserved for reference):
    //
    //   const MODEL_NAME = core.getInput("MODEL_NAME") || "gemini-1.5-flash";
    //   const langchainService = new LangchainService(MODEL_NAME, 0.2, 1000, API_TOKEN);
    //   const langchainServiceTestLLM = new LangchainServiceTestLLM(MODEL_NAME, 0.2, 1000, API_TOKEN);
    //   const lr_006 = new LR_006_joinRun(adapter, reporter, langchainService);
    //   const lr_007 = new LR_007_dependencies_order(adapter, reporter, langchainService);
    // ─────────────────────────────────────────────────────────────────────

    console.log("+++++ teste of LR_006 (detection only — refactor via SentinelCI API)");
    const lr_006 = new LR_006_joinRun(adapter, reporter);
    await lr_006.execute(name_Dockerfile);

    console.log("ℹ️ +++++ teste of LR_007_dependencies_order (detection only) ℹ️ ++++");
    const lr_007 = new LR_007_dependencies_order(adapter, reporter);
    await lr_007.execute(name_Dockerfile);

    // ─────────────────────────────────────────────────────────────────────
    // SentinelCI API integration (AI multi-agent refactoring)
    // First stage: send the Dockerfile + identification metadata to the API
    // and simply display the response.
    // ─────────────────────────────────────────────────────────────────────
    const API_URL = core.getInput("API_URL");
    const API_KEY = core.getInput("API_KEY");

    if (!API_URL || !API_KEY) {
      console.log(
        "ℹ️ API_URL/API_KEY not provided — skipping SentinelCI API integration."
      );
    } else {
      // Only the rules that the static analysis above actually flagged are sent,
      // so the API selects just the agents needed for the detected problems.
      const detectedRuleIds = reporter
        .getDetectedAgentIds()
        .filter((id) => SENTINEL_DEFAULT_RULE_IDS.includes(id));
      await runSentinelApiAnalysis(
        adapter,
        reporter,
        API_URL,
        API_KEY,
        name_Dockerfile,
        detectedRuleIds
      );
    }

    reporter.renderTable();
    core.summary.write();
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error running the action:`, errorMsg);
    core.setFailed(`Action failed with error: ${errorMsg}`);
  }
}

/**
 * First-stage SentinelCI API integration.
 *
 * Reads the Dockerfile, sends it (with identification metadata and the rule ids
 * to drive agent selection) to the SentinelCI API, and displays the response.
 */
async function runSentinelApiAnalysis(
  adapter: GitHubActionsAdapter,
  reporter: githubaActionsReporters,
  apiUrl: string,
  apiKey: string,
  name_Dockerfile: string,
  ruleIds: string[]
): Promise<void> {
  try {
    console.log("🛰️  ++++ SentinelCI API analysis ++++");

    // No violations detected by the static analysis → nothing to refactor.
    // (The API requires at least one rule id, so we skip the call.)
    if (ruleIds.length === 0) {
      console.log(
        "ℹ️ No violations detected by static analysis — nothing to refactor; skipping SentinelCI API call."
      );
      reporter.infoSuccess(
        "SentinelCI API: no violations detected — no AI refactoring needed."
      );
      return;
    }

    console.log(`🔎 Rules flagged by static analysis: ${ruleIds.join(", ")}`);

    const dockerfilePaths = await utils.finder({
      dir: adapter.workspace,
      file: name_Dockerfile,
      ignore: ["node_modules/**"],
      onlyFiles: true,
    });

    if (dockerfilePaths.length === 0) {
      reporter.infoWarning(
        `SentinelCI API: no '${name_Dockerfile}' found in the workspace — skipping.`
      );
      return;
    }

    const dockerfileContent = await fs.readFile(dockerfilePaths[0], "utf8");

    const ctx = adapter.context;
    const metadata: Record<string, unknown> = {
      repository: `${adapter.owner}/${adapter.repo}`,
      commit_sha: ctx?.sha,
      ref: ctx?.ref,
      workflow_name: ctx?.workflow,
      job_name: ctx?.job,
      workflow_run_id: ctx?.runId != null ? String(ctx.runId) : undefined,
      event_name: ctx?.eventName,
      dockerfile_path: dockerfilePaths[0],
    };

    const sentinelService = new SentinelApiService(apiUrl, apiKey);
    const response = await sentinelService.analyzeDockerfile({
      full_dockerfile_problem: dockerfileContent,
      dockerfile_snippet: dockerfileContent,
      rule_ids: ruleIds,
      agents: ruleIds,
      metadata,
    });

    // First stage: just display the response.
    console.log("✅ SentinelCI API response received:");
    console.log(`   status: ${response.status}`);
    console.log(`   selected_agents: ${response.selected_agents.join(", ")}`);
    console.log("   comment:\n" + response.comment);
    console.log("   full_dockerfile_correct:\n" + response.full_dockerfile_correct);

    reporter.infoSuccess(
      `SentinelCI API analysis completed (status: ${response.status}, agents: ${response.selected_agents.join(", ")})`
    );

    core.summary.addHeading("SentinelCI API — AI Refactoring", "2");
    core.summary.addRaw(`**Status:** ${response.status}\n\n`);
    core.summary.addRaw(`**Selected agents:** ${response.selected_agents.join(", ")}\n\n`);
    core.summary.addHeading("Comment", "3");
    core.summary.addRaw(`${response.comment}\n\n`);
    core.summary.addHeading("Corrected Dockerfile", "3");
    core.summary.addCodeBlock(response.full_dockerfile_correct, "dockerfile");

    displaySentinelMetrics(response.metrics);

    reporter.addTableRow({
      rule: "SentinelCI_API",
      status: "🛰️",
      details: `AI refactor (${response.selected_agents.join(", ")})`,
      link: "",
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("❌ SentinelCI API analysis failed:", errorMsg);
    // Non-fatal for this first stage: report but do not fail the whole action.
    reporter.infoError(`SentinelCI API analysis failed: ${errorMsg}`);
    reporter.addTableRow({
      rule: "SentinelCI_API",
      status: "❌",
      details: `API call failed: ${errorMsg}`,
      link: "",
    });
  }
}

/**
 * Displays the token-usage / cost metrics returned by the SentinelCI API,
 * both in the logs and in the GitHub Actions job summary. Safe to call when
 * metrics are absent (older API versions).
 */
function displaySentinelMetrics(metrics?: SentinelUsageMetrics): void {
  if (!metrics) {
    console.log("ℹ️ SentinelCI API: no metrics in the response.");
    return;
  }

  const fmtCost = (cost?: number | null) =>
    cost != null ? `$${cost.toFixed(6)}` : "—";
  const fmtDuration = (duration?: number | null) =>
    duration != null ? `${duration.toFixed(2)}s` : "—";

  console.log("📊 SentinelCI API metrics:");
  console.log(
    `   total tokens: ${metrics.total_tokens} ` +
      `(in: ${metrics.total_input_tokens}, out: ${metrics.total_output_tokens}), ` +
      `cost: ${fmtCost(metrics.total_cost)}`
  );
  for (const s of metrics.stages) {
    console.log(
      `   - [${s.stage}] ${s.name} (${s.model ?? "?"}): ` +
        `${s.total_tokens} tokens (in: ${s.input_tokens}, out: ${s.output_tokens}), ` +
        `cost: ${fmtCost(s.cost)}, duration: ${fmtDuration(s.duration)}`
    );
  }

  // Job summary: per-stage table + totals.
  core.summary.addHeading("Metrics (token usage & cost)", "3");
  const metricsTable: { data: string; header?: boolean }[][] = [
    [
      { data: "Stage", header: true },
      { data: "Agent", header: true },
      { data: "Model", header: true },
      { data: "Input", header: true },
      { data: "Output", header: true },
      { data: "Total", header: true },
      { data: "Cost", header: true },
      { data: "Duration", header: true },
    ],
  ];
  for (const s of metrics.stages) {
    metricsTable.push([
      { data: s.stage },
      { data: s.name },
      { data: s.model ?? "—" },
      { data: String(s.input_tokens) },
      { data: String(s.output_tokens) },
      { data: String(s.total_tokens) },
      { data: fmtCost(s.cost) },
      { data: fmtDuration(s.duration) },
    ]);
  }
  core.summary.addTable(metricsTable);
  core.summary.addRaw(
    `**Total:** ${metrics.total_tokens} tokens ` +
      `(in: ${metrics.total_input_tokens}, out: ${metrics.total_output_tokens}) — ` +
      `cost: ${fmtCost(metrics.total_cost)}\n\n`
  );
}

run();

/*
 * Copyright 2024 João Pedro Ramos de Oliveira
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
