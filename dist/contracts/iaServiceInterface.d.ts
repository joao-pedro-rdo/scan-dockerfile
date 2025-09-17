export interface RefactorRequest {
    dockerfileSnippet: string;
    context?: string;
    ruleType?: string;
}
export interface RefactorResponse {
    code: string;
    suggestion: string;
    explanation: string;
    confidence: number;
}
