/**
 * Contracts for communicating with the SentinelCI API (Agno multi-agent backend).
 *
 * These mirror the Pydantic schemas defined in the API:
 *  - DockerfileAnalysisRequest  -> SentinelAnalysisRequest
 *  - DockerfileAnalysisResponse -> SentinelAnalysisResponse
 *
 * Endpoint: POST {API_URL}/api/v1/analysis/dockerfile
 * Auth: header "X-SentinelCI-API-Key: <API_KEY>"
 */

/** Model provider that the API can route the analysis to. */
export type SentinelProvider = "chatgpt" | "gemini";

/**
 * Request body expected by POST /api/v1/analysis/dockerfile.
 *
 * @property full_dockerfile_problem Full Dockerfile content that contains the problem(s).
 * @property dockerfile_snippet      Relevant snippet (may be the full Dockerfile).
 * @property rule_ids                Linter rule ids that were triggered (e.g. ["lr_002", "lr_007"]).
 *                                   Valid ids on the API are lr_002 ... lr_007 (lr_001 is suspended).
 * @property agents                  Optional explicit agent selection. When omitted the API falls
 *                                   back to rule_ids to pick the agents.
 * @property provider                Optional per-request override of the model provider.
 * @property metadata                Free-form identification metadata (repository, commit, etc.).
 */
export interface SentinelAnalysisRequest {
  full_dockerfile_problem: string;
  dockerfile_snippet: string;
  rule_ids: string[];
  agents?: string[];
  provider?: SentinelProvider;
  metadata?: Record<string, unknown>;
}

/** Pipeline stage that produced a set of usage metrics. */
export type SentinelMetricsStage = "subagent" | "team" | "reviewer";

/**
 * Token usage and cost for a single pipeline stage (mirrors the API's
 * StageMetrics). `cost`/`duration` may be null when the provider omits them.
 */
export interface SentinelStageMetrics {
  stage: SentinelMetricsStage;
  name: string;
  model?: string | null;
  model_provider?: string | null;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  cost?: number | null;
  duration?: number | null;
}

/**
 * Aggregated token usage and estimated cost across the whole pipeline
 * (mirrors the API's UsageMetrics).
 */
export interface SentinelUsageMetrics {
  stages: SentinelStageMetrics[];
  total_input_tokens: number;
  total_output_tokens: number;
  total_tokens: number;
  total_cost?: number | null;
}

/**
 * Response body returned by POST /api/v1/analysis/dockerfile.
 *
 * @property status                  Analysis status (e.g. "completed").
 * @property selected_agents         Agents the API actually ran.
 * @property full_dockerfile_correct The corrected full Dockerfile.
 * @property comment                 Explanation/comment produced by the agents.
 * @property metrics                 Aggregated token usage and cost per stage.
 *                                   Optional for backward compatibility with
 *                                   older API versions that did not report it.
 */
export interface SentinelAnalysisResponse {
  status: string;
  selected_agents: string[];
  full_dockerfile_correct: string;
  comment: string;
  metrics?: SentinelUsageMetrics;
}
