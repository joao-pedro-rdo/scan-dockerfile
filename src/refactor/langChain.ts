import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { connected } from "process";

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
export class LangchainService {
  private llm: ChatGoogleGenerativeAI;
  private outputParser: StringOutputParser;

  constructor(
    model?: string,
    temperature?: number,
    maxTokens?: number,
    apiKey?: string
  ) {
    this.llm = new ChatGoogleGenerativeAI({
      model: model || "gemini-1.5-flash",
      temperature: temperature || 0.1,
      maxOutputTokens: maxTokens || 500,
      apiKey: apiKey || process.env.GOOGLE_API_KEY,
    });
    // Setting of output parser
    this.outputParser = new StringOutputParser();
  }

  // Make the prompt template dynamic based on ruleType
  private createPromptTemplate(ruleType?: string): PromptTemplate {
    let systemMessage = `You are a Docker and DevOps expert. Analyze the provided Dockerfile snippet and suggest a refactoring following best practices.

    RULES:
    - Respond in English
    - Be specific and practical
    - Briefly explain the reason for the change
    - If no improvements are needed, say "No improvements necessary"
    - Format the response as JSON with these fields: code (string), suggestion  (string), explanation (string), confidence (number between 0 and 1)

    EXAMPLE INPUT:
    {
      "dockerfileSnippet": "RUN chmod 777 /app/script.sh",
      "context": "This is a mistake, use 777 permissions on linux, correct it"
    }

    EXAMPLE RESPONSE:
    {
      "code": "RUN chmod +x /app/script.sh",
      "suggestion": "Replace 'chmod 777' with 'chmod +x' to enhance security.",
      "explanation": "Using 777 permissions can expose the application to security risks by allowing write access to all users.",
      "confidence": 0.9
    }`;

    // // REMOVE FOR TEST
    // if (ruleType === "security") {
    //   systemMessage += `\n- Security: non-root users, secure base images, secrets management`;
    // } else if (ruleType === "performance") {
    //   systemMessage += `\n- Performance: cache optimization, layer reduction, multi-stage builds`;
    // } else if (ruleType === "best-practices") {
    //   systemMessage += `\n- Best practices: WORKDIR, proper COPY usage, package management`;
    // } else {
    //   systemMessage += `\n- General: security, performance, and best practices`;
    // }

    // if (suggestion) {
    //   systemMessage += `\n\nSPECIFIC SUGGESTION TO VALIDATE: ${suggestion}`;
    // }

    return PromptTemplate.fromTemplate(`${systemMessage}

    DOCKERFILE SNIPPET:
    {dockerfileSnippet}

    ADDITIONAL CONTEXT:
    {context}

    ANALYSIS:`);
  }

  async suggestRefactor(request: RefactorRequest): Promise<RefactorResponse> {
    try {
      // Make the prompt and add ruleType if provided
      const promptTemplate = this.createPromptTemplate(request.ruleType);

      // prompt -> LLM -> parser
      const chain = promptTemplate.pipe(this.llm).pipe(this.outputParser);

      const response = await chain.invoke({
        dockerfileSnippet: request.dockerfileSnippet,
        context: request.context || "No additional context provided",
      });

      try {
        // Remove markdown if present and parse JSON
        const cleanResponse = response.replace(/```json\n?|\n?```/g, "").trim();
        const parsed = JSON.parse(cleanResponse);

        return {
          code: parsed.code,
          suggestion: parsed.suggestion,
          explanation: parsed.explanation || "No explanation provided",
          confidence: this.normalizeConfidence(parsed.confidence),
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
        `Refactoring suggestion failed: ${
          error instanceof Error ? error.message : String(error)
        }`
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
