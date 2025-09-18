import { DockerfileParser } from "dockerfile-ast";
import { Dockerfile } from "dockerfile-ast/lib/dockerfile";

export interface IRequestAstDockerfile {
  keyword: string; // A keyword of dockerfile like FROM, RUN, WORKDIR, with you ant to search
  args: string[]; // Arguments of the keyword
}

export interface IResponseAstDockerfile {
  found: boolean; // If the keyword was found
  keyword: string[];
  args: string[];
  line: number[];
}

// TODO: This is Adapter
/**
 * AdapterDockerfileAST is an adapter class that wraps the DockerfileParser from the dockerfile-ast library.
 * @link https://github.com/rcjsuen/dockerfile-ast
 * It provides methods to parse and analyze Dockerfile content.
 */
export class AdapterDockerfileAST {
  public constructor(public content: any) {
    this.content = DockerfileParser.parse(content);
  }

  async searchKeyword(
    obj: IRequestAstDockerfile
  ): Promise<IResponseAstDockerfile> {
    try {
      for (const instruction of this.content.getInstructions()) {
        const keyword = instruction.getKeyword();
        const args = instruction.getArguments();
        const range = instruction.getRange();

        //Show for debugging
        // TODO Add to core.debug
        console.log(`🔹 ${keyword}`);
        console.log(`   Args: ${args.join(" ")}`);
        console.log(
          `   pos: line ${range.start.line + 1}, column ${
            range.start.character + 1
          }, range: [${range.start.line + 1},${
            range.start.character + 1
          }] to [${range.end.line + 1},${range.end.character + 1}]`
        );

        if (
          instruction.getKeyword().toUpperCase() === obj.keyword.toUpperCase()
        ) {
          return {
            found: true,
            keyword: [keyword],
            args: args.map((arg: { getValue: () => any }) => arg.getValue()),
            line: [range.start.line + 1],
          };
        }
      }

      // If i dont make return in the for loop, means that no keyword was found
      return {
        found: false,
        keyword: [],
        line: [],
        args: [],
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Error executing searchKeyword on dockerfileAST:`,
        errorMsg
      );
      throw new Error(
        `Failed to execute searchKeywordon dockerfileAST : ${errorMsg}`
      );
    }
  }

  /**
   *  This method return a first match of the pattern in the dockerfile
   * @param pattern: RegExp
   * @returns Array of IResponseAstDockerfile with all matches (keyword, args, line)
   */
  async searchPattern(
    patterns: RegExp[]
  ): Promise<Array<IResponseAstDockerfile>> {
    const match: Array<IResponseAstDockerfile> = [];

    try {
      for (const instruction of this.content.getInstructions()) {
        const keyword = instruction.getKeyword();
        const args = instruction.getArguments();
        const range = instruction.getRange();

        //Convert line of args to string
        const argsString = args
          .map((arg: { getValue: () => any }) => arg.getValue())
          .join(" ");

        // Seacrh for pattern in the argsString
        // Using matchAll to find all occurrences
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
        for (const pattern of patterns) {
          const matches = argsString.matchAll(pattern);
          for (const regexMatch of matches) {
            match.push({
              found: true,
              keyword: [keyword],
              args: args.map((arg: { getValue: () => any }) => arg.getValue()),
              line: [range.start.line + 1],
            });
          }
        }
      }
      return match;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Error executing searchPattern on dockerfileAST:`,
        errorMsg
      );
      throw new Error(
        `Failed to execute searchPattern on dockerfileAST : ${errorMsg}`
      );
    }
  }

  /**
   * This method checks if any of the provided patterns match any instruction
   * @param patterns: RegExp[]
   */
  async searchPattern2(
    patterns: RegExp[]
  ): Promise<Array<IResponseAstDockerfile>> {
    const match: Array<IResponseAstDockerfile> = [];

    try {
      for (const instruction of this.content.getInstructions()) {
        const keyword = instruction.getKeyword();
        const args = instruction.getArguments();
        const range = instruction.getRange();

        const argsString = args
          .map((arg: { getValue: () => any }) => arg.getValue())
          .join(" ");

        const hasMatch = patterns.some((pattern) => pattern.test(argsString));

        if (hasMatch) {
          match.push({
            found: true,
            keyword: [keyword],
            args: args.map((arg: { getValue: () => any }) => arg.getValue()),
            line: [range.start.line + 1],
          });
        }
      }
      return match;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Error executing searchFirstPattern on dockerfileAST:`,
        errorMsg
      );
      throw new Error(
        `Failed to execute searchFirstPattern on dockerfileAST : ${errorMsg}`
      );
    }
  }

  async searchFirstPattern(
    patterns: RegExp[]
  ): Promise<IResponseAstDockerfile> {
    try {
      for (const instruction of this.content.getInstructions()) {
        const keyword = instruction.getKeyword();
        const args = instruction.getArguments();
        const range = instruction.getRange();

        const argsString = args
          .map((arg: { getValue: () => any }) => arg.getValue())
          .join(" ");

        const hasMatch = patterns.some((pattern) => pattern.test(argsString));

        if (hasMatch) {
          return {
            found: true,
            keyword: [keyword],
            args: args.map((arg: { getValue: () => any }) => arg.getValue()),
            line: [range.start.line + 1],
          };
        }
        // If no match found, return empty
      }
      return {
        found: false,
        keyword: [],
        line: [],
        args: [],
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Error executing searchFirstPattern on dockerfileAST:`,
        errorMsg
      );
      throw new Error(
        `Failed to execute searchFirstPattern on dockerfileAST : ${errorMsg}`
      );
    }
  }

  async searchConsecutiveKeyword(
    obj: IRequestAstDockerfile
  ): Promise<Array<IResponseAstDockerfile>> {
    const allInstructions: Array<IResponseAstDockerfile> = [];

    try {
      for (const instruction of this.content.getInstructions()) {
        const keyword = instruction.getKeyword();
        const args = instruction.getArguments();
        const range = instruction.getRange();

        //Show for debugging
        // TODO Add to core.debug
        console.log(`🔹 ${keyword}`);
        console.log(`   Args: ${args.join(" ")}`);
        console.log(`   pos: line ${range.start.line + 1}`);

        allInstructions.push({
          found: true,
          keyword: [keyword],
          args: args.map((arg: { getValue: () => any }) => arg.getValue()),
          line: [range.start.line + 1],
        });
      }

      let i = 0;
      while (i < allInstructions.length) {
        if (
          allInstructions[i].keyword[0].toUpperCase() ===
          obj.keyword.toUpperCase()
        ) {
          const consecutiveGroup: Array<IResponseAstDockerfile> = [];

          consecutiveGroup.push(allInstructions[i]);

          let j = i + 1;
          while (
            j < allInstructions.length &&
            allInstructions[j].keyword[0].toUpperCase() ===
              obj.keyword.toUpperCase()
          ) {
            consecutiveGroup.push(allInstructions[j]);
            j++;
          }

          return consecutiveGroup;
        }
        i++;
      }

      return [];
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Error executing searchConsecutiveKeyword on dockerfileAST:`,
        errorMsg
      );
      throw new Error(
        `Failed to execute searchConsecutiveKeyword on dockerfileAST: ${errorMsg}`
      );
    }
  }

  async searchAllConsecutiveGroups(
    obj: IRequestAstDockerfile
  ): Promise<Array<Array<IResponseAstDockerfile>>> {
    const allInstructions: Array<IResponseAstDockerfile> = [];
    const consecutiveGroups: Array<Array<IResponseAstDockerfile>> = [];

    try {
      // Coleta todas as instruções
      for (const instruction of this.content.getInstructions()) {
        const keyword = instruction.getKeyword();
        const args = instruction.getArguments();
        const range = instruction.getRange();

        allInstructions.push({
          found: true,
          keyword: [keyword],
          args: args.map((arg: { getValue: () => any }) => arg.getValue()),
          line: [range.start.line + 1],
        });
      }

      // Encontra TODOS os grupos consecutivos
      let i = 0;
      while (i < allInstructions.length) {
        if (
          allInstructions[i].keyword[0].toUpperCase() ===
          obj.keyword.toUpperCase()
        ) {
          const consecutiveGroup: Array<IResponseAstDockerfile> = [];

          // Adiciona o primeiro
          consecutiveGroup.push(allInstructions[i]);

          // Procura consecutivos
          let j = i + 1;
          while (
            j < allInstructions.length &&
            allInstructions[j].keyword[0].toUpperCase() ===
              obj.keyword.toUpperCase()
          ) {
            consecutiveGroup.push(allInstructions[j]);
            j++;
          }

          // ✅ Salva cada grupo encontrado
          consecutiveGroups.push(consecutiveGroup);

          i = j; // Pula para depois do grupo
        } else {
          i++;
        }
      }

      // Retorna todos os grupos em um array flat
      return consecutiveGroups.length > 0 ? consecutiveGroups : [[]];
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error executing searchAllConsecutiveGroups:`, errorMsg);
      throw new Error(
        `Failed to execute searchAllConsecutiveGroups: ${errorMsg}`
      );
    }
  }
}
