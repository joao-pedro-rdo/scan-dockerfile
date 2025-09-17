import { RefactorRequest, RefactorResponse } from "../contracts/iaServiceInterface.js";
/**
 * LangchainService integrates with Google Gemini via LangChain to provide AI-driven suggestions for Dockerfile refactoring.
 * It uses prompt templates and output parsers to structure interactions with the LLM.
 */
export declare class LangchainService {
    private llm;
    private outputParser;
    constructor(model?: string, temperature?: number, maxTokens?: number, apiKey?: string);
    private createPromptTemplate;
    /**
     *
     * @param request: RefactorRequest
     * @returns RefactorResponse
     */
    suggestRefactor(request: RefactorRequest): Promise<RefactorResponse>;
    private normalizeConfidence;
    isHighConfidence(response: RefactorResponse): boolean;
    formatSuggestion(suggestion: string): string;
    analyzeRule(dockerfileContent: string, ruleName: string, ruleDescription: string): Promise<RefactorResponse>;
}
