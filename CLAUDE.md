# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SentinelCI is a GitHub Action that scans Dockerfiles for best practices, security issues, and optimization opportunities. It uses TypeScript, integrates with the GitHub API via Octokit, and optionally uses LLMs (Groq/Gemini via LangChain) for AI-powered refactoring suggestions.

## Commands

```bash
npm run build          # Bundle TypeScript → dist/ using Vercel NCC (single JS file)
npm run build:ci       # Type-check + build (used in CI)
npm run type-check     # TypeScript type check without emitting
npm run format         # Format all files with Prettier
npm run format:check   # Check formatting without modifying files
npm start              # Run the compiled action locally (node dist/index.js)
```

There are no tests currently (`npm test` is a placeholder).

## Architecture

**Entry point:** `src/index.ts` — creates the GitHub adapter and reporter, then runs linter rules sequentially.

**Key abstractions (`src/contracts/`):**
- `ILinterRule` — interface all linter rules implement; each rule receives the adapter + reporter + Dockerfile AST
- `IGitHubActionsAdapter` — wraps Octokit for GitHub API calls
- `IReporter` / `IgithubaActionsReporters` — output abstraction (logs, issues, PR comments)
- `iaServiceInterface.ts` — `RefactorRequest`/`RefactorResponse` for LLM calls

**Linter rules (`src/linterRules/LR_00N_*.ts`):** Named `LR_001` through `LR_007`. All rules now run
as **fast static-analysis detectors** — they detect a violation and register the agent id (via the
reporter). The actual refactoring is delegated to the SentinelCI API. `LR_006` (join RUN layers) and
`LR_007` (dependency order) accept an **optional** `LangchainService`: when omitted (the default in
`index.ts`) they are detection-only; when provided they run the legacy local-LLM refactoring path.

**AI layer (`src/refactor/`) — legacy, kept for historical comparison (TCC):**
- `dockerfileAST.ts` — wraps `dockerfile-ast` library with an `AdapterDockerfileAST` class (still used
  by the detectors).
- `langChain.ts` — `LangchainService` using Groq; `langChainTesteLLM.ts` is a test/stub variant. These
  are **no longer wired into the default flow** (refactoring moved to the SentinelCI API) but remain in
  the repo and can be re-enabled by passing a service to `LR_006`/`LR_007` in `index.ts`. Because
  nothing instantiates them in the live path, ncc tree-shakes LangChain out of `dist/index.js`.

**SentinelCI API layer (`src/services/`):**
- `sentinelApiService.ts` — `SentinelApiService`, a thin HTTP client (native `fetch`, no extra deps) that
  POSTs to `{API_URL}/api/v1/analysis/dockerfile` with the `X-SentinelCI-API-Key` header. Sends a
  `SentinelAnalysisRequest` and returns a `SentinelAnalysisResponse`. Also exports
  `SENTINEL_DEFAULT_RULE_IDS` (the agent ids supported by the API: `lr_002`…`lr_007`; `lr_001` is
  suspended server-side).
- Contracts live in `src/contracts/sentinelApiInterface.ts` (mirror the API's Pydantic schemas,
  including `SentinelUsageMetrics`/`SentinelStageMetrics` for the token usage + cost returned by the
  API).
- Orchestrated by `runSentinelApiAnalysis()` in `src/index.ts`, which runs only when both `API_URL`
  and `API_KEY` inputs are set. Current scope: the response (corrected Dockerfile, comment, and
  per-stage metrics via `displaySentinelMetrics()`) is **only displayed** (logs + job summary); no PR
  is opened yet.

**Detection → agent selection:** the reporter (`githubaActionsReporters`) records the agent id for
every rule it sees flagged. In `addTableRow`, any row whose status is a violation (`❌`/`⚠️`, not
`✔️`) maps its rule name (`LR_002_setWorkdir` → `lr_002`) into a set exposed via
`getDetectedAgentIds()`. `index.ts` filters that set to `SENTINEL_DEFAULT_RULE_IDS` and sends it as
both `rule_ids` and `agents` so the API runs only the agents for the problems actually detected. When
the set is empty, the API call is skipped.

**Heuristics (`src/heuristic/`):** Pure domain knowledge helpers used by AI rules (e.g., known dependency file patterns per ecosystem: npm, pip, go, cargo).

**Output flow:** Rules push findings to `githubaActionsReporters` (`src/reporters/`), which creates GitHub issues, PR review comments, or job summaries depending on context.

## Bundling

The action uses `@vercel/ncc` to bundle `src/index.ts` and all dependencies into a single `dist/index.js`. The `dist/` directory is committed to the repository — the CI workflow (`build.yml`) auto-commits updated builds on pushes to main/develop/feature branches.

## Adding a New Linter Rule

1. Create `src/linterRules/LR_00N_<name>.ts` implementing `ILinterRule`.
2. Import and call it in `src/index.ts`.
3. New rules should be detection-only and report via the reporter so the matching agent id is sent to
   the SentinelCI API. (The legacy local-LLM path via `LangchainService` is kept only for historical
   comparison.)

## Environment / Inputs

The action reads inputs via `@actions/core` as defined in `action.yml`.

The `API_URL` and `API_KEY` inputs (both optional) enable the SentinelCI API integration. They work as a pair — if either is missing, the integration is skipped. `API_URL` is the API base URL; `API_KEY` is the SentinelCI access key sent as `X-SentinelCI-API-Key`.

`API_TOKEN` and `MODEL_NAME` are **legacy** inputs for the superseded local LangChain rules. They are no longer required — refactoring now runs on the SentinelCI API.

## Code Style

Prettier enforces formatting (`.prettierrc.json`): 100-char line width, double quotes, trailing commas (ES5), LF line endings. Run `npm run format` before committing.
