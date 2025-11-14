import { IGitHubActionsAdapter } from "../contracts/githubActionsInterface";
import { githubaActionsReporters } from "../reporters/githubaActionsReporters";
import { ILinterRule } from "../contracts/LR_interface";
import { AdapterDockerfileAST } from "../refactor/dockerfileAST";
import { IResponseAstDockerfile } from "../refactor/dockerfileAST";
import { promises as fs } from "fs";
import * as utils from "../utils";

export class LR_007_dependencies_order implements ILinterRule {
  constructor(
    private adapter: IGitHubActionsAdapter,
    private reporter: githubaActionsReporters, // Need to use general ClassReporter
    public issueTitle: string = "Ensure dependencies are installed in the correct order",
    public rule: string = "LR_007_dependencies_order",
    public listDependencies: JSON[],
    public listSource: JSON[]
  ) {}
  execute(name_Dockerfile?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private async searchDockerfilePath(name_Dockerfile: string): Promise<string[]> {
    const dockerfilePath = await utils.finder({
      dir: this.adapter.workspace,
      file: name_Dockerfile,
      ignore: ["node_modules/**"],
      onlyFiles: true,
    });
    return dockerfilePath;
  }

  /** Normalize operations to have one source per object, some COPY/ADD can have multiple sources
   * @param obj Array of IResponseAstDockerfile
   * @returns Array of normalized operations
   * @example
   */
  private normalizeOperations(obj: Array<IResponseAstDockerfile>) {
    return obj.flatMap((item, itemIndex) => {
      if (item.args.length < 2) return [];

      const destination = item.args[item.args.length - 1];
      const sources = item.args.slice(0, -1);

      return sources.map((source, sourceIndex) => ({
        source,
        destination,
        line: item.line[0],
        keyword: item.keyword[0],
        itemIndex,
        sourceIndex,
      }));
    });
  }

  public async verify_type(obj: Array<IResponseAstDockerfile>): Promise<void> {
    const operations = this.normalizeOperations(obj);
    console.log("Normalized Operations:", operations);

    // //* If this a dir
    //   if (source === '.' || source === './') {
    //     console.log(`📂📂📂📂 Line ${line}: Source is a directory (${source})`);
    //   //! fazer a interaçao no repositorsio para verificar o conteudo
    // }

    // for (let i = 0; i < this.listSource.length; i++) {

    // }
    // for (const source of this.listDependencies) {
  }
}

// implementar a logica para verificar o tipo de operacao
// Func verificar qual a o tipo de operacao realizada na instrucao, retornar se é dependecy ou sorce
//  . .  sorce
// package.json dependecy
// no caso de mais de um rodar iterativamente
// consultar o ENUM de lista de dependencias e lista de source

//   SEARCH RESULT COPY [
// { found: true, keyword: [ 'COPY' ], args: [ '.', '.' ], line: [ 8 ] },
// {
//   found: true,
//   keyword: [ 'COPY' ],
//   args: [ 'package*.json', './' ],
//   line: [ 12 ]
// }

// se for um . ou diretorio iterar o repositorio para verificar oq tem la, e ver o padrao correspondente e comprar todos os arquivos que ele tem para o padrao de dependecy e o resto sera sorce
// ai fazer a logisca heurustica para verificar

// Passo 01: Coletar todas as instruções COPY e ADD do Dockerfile.
// Passo 02: Para cada instrução coletada, identificar seu tipo ("dependency" ou "source").
// Passo 03: Verificar se há alguma instrução do tipo "source" posicionada após uma instrução do tipo "dependency". Se sim, retornar TRUE. Caso contrário, retornar FALSE.

//   async execute(name_Dockerfile: string): Promise<any> {
//     try {
//       const dockerfilePath = await this.searchDockerfilePath(name_Dockerfile);
//       const dockerfileContent = await fs.readFile(dockerfilePath[0], "utf8");
//       const dockerfile = new AdapterDockerfileAST(dockerfileContent);

//       // ask the AST to search for COPY
//       const searchResult = await dockerfile.searchConsecutiveKeyword({
//         keyword: "COPY",
//         args: [],
//       });

//       console.log("SEARCH RESULT COPY", searchResult);
//     } catch (error) {
//       const errorMsg = error instanceof Error ? error.message : String(error);
//       console.error(`❌ Error executing ${this.rule}:`, errorMsg);
//       throw new Error(`Failed to execute ${this.rule}: ${errorMsg}`);
//     }
//   }
// }
