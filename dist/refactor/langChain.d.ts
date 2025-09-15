interface RefactorRequest {
    dockerfileSnippet: string;
    context?: string;
    ruleType?: string;
}
interface RefactorResponse {
    suggestion: string;
    explanation: string;
    confidence: number;
}
export declare class LangchainService {
    private llm;
    private outputParser;
    constructor(model?: string, temperature?: number, maxTokens?: number, apiKey?: string);
    private createPromptTemplate;
    suggestRefactor(request: RefactorRequest): Promise<RefactorResponse>;
    private normalizeConfidence;
    isHighConfidence(response: RefactorResponse): boolean;
    formatSuggestion(suggestion: string): string;
    analyzeRule(dockerfileContent: string, ruleName: string, ruleDescription: string): Promise<RefactorResponse>;
}
export {};
