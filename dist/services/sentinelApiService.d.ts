import { SentinelAnalysisRequest, SentinelAnalysisResponse } from "../contracts/sentinelApiInterface";
/**
 * Default agent/rule ids supported by the SentinelCI API.
 * lr_001 (.dockerignore) is intentionally excluded — it is suspended on the API
 * (the correction target is a separate file the route does not handle yet).
 */
export declare const SENTINEL_DEFAULT_RULE_IDS: string[];
/**
 * Thin HTTP client for the SentinelCI API. Sends a Dockerfile (plus identifying
 * metadata and the triggered rule ids) to the multi-agent backend and returns
 * the corrected Dockerfile and comment.
 *
 * Uses the global `fetch` available on Node 20 (the action runtime).
 */
export declare class SentinelApiService {
    private readonly baseUrl;
    private readonly apiKey;
    /**
     * @param apiUrl Base URL of the SentinelCI API (e.g. "https://api.example.com").
     *               A trailing slash is tolerated.
     * @param apiKey SentinelCI API key sent in the "X-SentinelCI-API-Key" header.
     */
    constructor(apiUrl: string, apiKey: string);
    /**
     * Calls POST /api/v1/analysis/dockerfile.
     * @param request Body matching the API's DockerfileAnalysisRequest schema.
     * @returns The parsed DockerfileAnalysisResponse.
     * @throws Error when the API responds with a non-2xx status.
     */
    analyzeDockerfile(request: SentinelAnalysisRequest): Promise<SentinelAnalysisResponse>;
}
