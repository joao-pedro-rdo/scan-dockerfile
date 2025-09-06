import { DockerfileParser } from "dockerfile-ast";
import { Dockerfile } from "dockerfile-ast/lib/dockerfile";

export interface IRequestAstDockerfile {
  keyword: string; // A keyword of dockerfile like FROM, RUN, WORKDIR, with you ant to search
  args: string[]; // Arguments of the keyword
}

export interface IResponseAstDockerfile {
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
        const range = instruction.getRange(); //? I Dont understand keyword and args

        //Show for debugging
        // TODO Add to core.debug
        console.log(`🔹 ${keyword}`);
        console.log(`   Argumentos: ${args.join(" ")}`);
        console.log(
          `   Posição: linha ${range.start.line + 1}, coluna ${
            range.start.character + 1
          }, range: [${range.start.line + 1},${
            range.start.character + 1
          }] até [${range.end.line + 1},${range.end.character + 1}]`
        );

        if (
          instruction.getKeyword().toUpperCase() === obj.keyword.toUpperCase()
        ) {
          return {
            keyword: [keyword],
            args: args.map((arg: { getValue: () => any }) => arg.getValue()),
            line: [range.start.line + 1],
          };
        }
      }

      // If i dont make return in the for loop, means that no keyword was found
      return {
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
}
