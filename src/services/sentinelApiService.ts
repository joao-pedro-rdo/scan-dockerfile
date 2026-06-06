import {
  SentinelAnalysisRequest,
  SentinelAnalysisResponse,
} from "../contracts/sentinelApiInterface";

/**
 * Default agent/rule ids supported by the SentinelCI API.
 * lr_001 (.dockerignore) is intentionally excluded — it is suspended on the API
 * (the correction target is a separate file the route does not handle yet).
 */
export const SENTINEL_DEFAULT_RULE_IDS = [
  "lr_002",
  "lr_003",
  "lr_004",
  "lr_005",
  "lr_006",
  "lr_007",
];

/** Path of the analysis endpoint, appended to the configured API base URL. */
const ANALYSIS_PATH = "/api/v1/analysis/dockerfile";

/**
 * Thin HTTP client for the SentinelCI API. Sends a Dockerfile (plus identifying
 * metadata and the triggered rule ids) to the multi-agent backend and returns
 * the corrected Dockerfile and comment.
 *
 * Uses the global `fetch` available on Node 20 (the action runtime).
 */
export class SentinelApiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  /**
   * @param apiUrl Base URL of the SentinelCI API (e.g. "https://api.example.com").
   *               A trailing slash is tolerated.
   * @param apiKey SentinelCI API key sent in the "X-SentinelCI-API-Key" header.
   */
  constructor(apiUrl: string, apiKey: string) {
    // Strip trailing slashes so we can safely concatenate the endpoint path.
    this.baseUrl = apiUrl.replace(/\/+$/, "");
    this.apiKey = apiKey;
  }

  /**
   * Calls POST /api/v1/analysis/dockerfile.
   * @param request Body matching the API's DockerfileAnalysisRequest schema.
   * @returns The parsed DockerfileAnalysisResponse.
   * @throws Error when the API responds with a non-2xx status.
   */
  async analyzeDockerfile(request: SentinelAnalysisRequest): Promise<SentinelAnalysisResponse> {
    const url = `${this.baseUrl}${ANALYSIS_PATH}`;
    console.log(`📡 Sending analysis request to SentinelCI API: ${url}`);

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-SentinelCI-API-Key": this.apiKey,
        },
        body: JSON.stringify(request),
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to reach SentinelCI API at ${url}: ${errorMsg}`);
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `SentinelCI API request failed (${response.status} ${response.statusText}): ${errorBody}`
      );
    }

    return (await response.json()) as SentinelAnalysisResponse;
  }
}
