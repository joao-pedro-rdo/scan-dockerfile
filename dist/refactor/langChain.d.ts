interface RefactorRequest {
    dockerfileSnippet: string;
    context?: string;
    ruleType?: string;
}
interface RefactorResponse {
    code: string;
    suggestion: string;
    explanation: string;
    confidence: number;
}
/**
 * LangchainService integrates with Google Gemini via LangChain to provide AI-driven suggestions for Dockerfile refactoring.
 * It uses prompt templates and output parsers to structure interactions with the LLM.
 */
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
