import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

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

export class LangchainService {
  private llm: ChatOpenAI;
  private outputParser: StringOutputParser;

  constructor(
    model: string,
    temperature?: number,
    maxTokens?: number,
    apiKey?: string
  ) {
    // Setting od model
    this.llm = new ChatOpenAI({
      modelName: model || "gpt-3.5-turbo",
      temperature: temperature || 0.1,
      maxTokens: maxTokens || 500,
      apiKey: apiKey,
    });
    // Setting of output parser
    this.outputParser = new StringOutputParser();
  }

  private createPromptTemplate(
    ruleType?: string,
    suggestion?: string
  ): PromptTemplate {
    let systemMessage = `You are a Docker and DevOps expert. Analyze the provided Dockerfile snippet and suggest a refactoring following best practices.

    RULES:
    - Respond in English
    - Be specific and practicals
    - Briefly explain the reason for the change
    - If no improvements are needed, say "No improvements necessary"
    - Format the response as JSON with these fields: suggestion (string), explanation (string), confidence (number between 0 and 1)`;
    // if (ruleType === "security") {
    //   systemMessage += `\n\nFOCO EM SEGURANÇA: Priorize aspectos de segurança como usuários não-root, imagens base seguras, etc.`;
    // } else if (ruleType === "performance") {
    //   systemMessage += `\n\nFOCO EM PERFORMANCE: Priorize otimizações de cache, redução de layers, etc.`;
    // }

    // if (suggestion) {
    //   systemMessage += `\n\nSUGESTÃO: ${suggestion}`;
    // }
    return PromptTemplate.fromTemplate(`${systemMessage}

    TRECHO DO DOCKERFILE:
    {dockerfileSnippet}

    CONTEXTO ADICIONAL:
    {context}

    RESPOSTA:`);
  }

  async suggestRefactor(request: RefactorRequest): Promise<RefactorResponse> {
    try {
      const promptTemplate = this.createPromptTemplate(request.ruleType);

      // prompt -> LLM -> parser
      const chain = promptTemplate.pipe(this.llm).pipe(this.outputParser);

      const response = await chain.invoke({
        dockerfileSnippet: request.dockerfileSnippet,
        context: request.context || "No additional context provided",
      });

      try {
        const parsed = JSON.parse(response);
        return {
          suggestion: parsed.suggestion || response,
          explanation: parsed.explanation || "No explanation provided",
          confidence: parsed.confidence || 0.5,
        };
      } catch (parseError) {
        // If unable to parse, return simple response
        return {
          suggestion: response,
          explanation: "Unstructured AI response",
          confidence: 0.3,
        };
      }
    } catch (error) {
      console.error("Error calling LangChain:", error);
      throw new Error(
        `Refactoring suggestion failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  // Method to validate if the suggestion is applicable
  isHighConfidence(response: RefactorResponse): boolean {
    return (
      response.confidence >= 0.7 &&
      response.suggestion !== "No improvements necessary" &&
      response.suggestion.trim().length > 10
    );
  }

  // Method to clean and format the suggestion
  public formatSuggestion(suggestion: string): string {
    return suggestion
      .trim()
      .replace(/```dockerfile\n?/g, "") // Remove code markdown
      .replace(/```\n?/g, "")
      .trim();
  }
}
