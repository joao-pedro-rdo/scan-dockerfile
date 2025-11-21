import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { connected } from "process";
import { RefactorRequest, RefactorResponse } from "../contracts/iaServiceInterface.js";
import { LangchainService } from "./langChain";
import { ChatGroq } from "@langchain/groq";
interface testModel {
  repose: string;
}
/**
 * LangchainService integrates with Google Gemini via LangChain to provide AI-driven suggestions for Dockerfile refactoring.
 * It uses prompt templates and output parsers to structure interactions with the LLM.
 */
export class LangchainServiceTestLLM {
  private llm: ChatGroq;
  private outputParser: StringOutputParser;

  constructor(model?: string, temperature?: number, maxTokens?: number, apiKey?: string) {
    this.llm = new ChatGroq({
      model: model || "gemini-1.5-flash",
      temperature: temperature || 0.1,
      apiKey: apiKey || process.env.GOOGLE_API_KEY,
    });
    // Setting of output parser
    this.outputParser = new StringOutputParser();
  }

  // Make the prompt template dynamic based on ruleType
  private createPromptTemplate(ruleType?: string): PromptTemplate {
    let systemMessage = ``;

    return PromptTemplate.fromTemplate(`${systemMessage}
    {context}

    Correct them:`);
  }
  /**
   *
   * @param request: RefactorRequest
   * @returns RefactorResponse
   */
  async suggestRefactor(request: RefactorRequest): Promise<RefactorResponse> {
    try {
      // Make the prompt and add ruleType if provided
      const promptTemplate = this.createPromptTemplate(request.ruleType);

      // prompt -> LLM -> parser
      const chain = promptTemplate.pipe(this.llm).pipe(this.outputParser);

      const response = await chain.invoke({
        // dockerfileSnippet: request.dockerfileSnippet,
        context: request.context || "No additional context provided",
      });

      try {
        // // Remove markdown if present and parse JSON
        // const cleanResponse = response.replace(/```json\n?|\n?```/g, "").trim();
        // const parsed = JSON.parse(cleanResponse);

        return {
          code: "AI generated response",
          suggestion: response,
          explanation: "AI generated response",
          confidence: 0.8,
        };
      } catch (parseError) {
        console.warn("Failed to parse JSON response, using raw text");
        return {
          code: "Unstructured AI response",
          suggestion: response,
          explanation: "Unstructured AI response",
          confidence: 0.3,
        };
      }
    } catch (error) {
      console.error("Error calling Gemini:", error);
      throw new Error(
        `Refactoring suggestion failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private normalizeConfidence(confidence: any): number {
    if (typeof confidence === "number" && confidence >= 0 && confidence <= 1) {
      return confidence;
    }
    return 0.5; // Valor padrão
  }

  isHighConfidence(response: RefactorResponse): boolean {
    return (
      response.confidence >= 0.7 &&
      response.suggestion !== "No improvements necessary" &&
      response.suggestion.trim().length > 10 &&
      !response.suggestion.toLowerCase().includes("no improvement")
    );
  }

  public formatSuggestion(suggestion: string): string {
    return suggestion
      .trim()
      .replace(/```dockerfile\n?/g, "") // Remove markdown dockerfile
      .replace(/```json\n?/g, "") // Remove markdown json
      .replace(/```\n?/g, "") // Remove markdown genérico
      .replace(/^\*\*|\*\*$/g, "") // Remove bold markdown
      .trim();
  }

  async analyzeRule(
    dockerfileContent: string,
    ruleName: string,
    ruleDescription: string
  ): Promise<RefactorResponse> {
    return this.suggestRefactor({
      dockerfileSnippet: dockerfileContent,
      context: `Analyzing compliance with rule: ${ruleName} - ${ruleDescription}`,
      ruleType: "best-practices",
    });
  }
}
