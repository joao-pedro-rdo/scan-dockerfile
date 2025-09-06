export interface IRequestAstDockerfile {
    keyword: string;
    args: string[];
}
export interface IResponseAstDockerfile {
    keyword: string[];
    args: string[];
    line: number[];
}
/**
 * AdapterDockerfileAST is an adapter class that wraps the DockerfileParser from the dockerfile-ast library.
 * @link https://github.com/rcjsuen/dockerfile-ast
 * It provides methods to parse and analyze Dockerfile content.
 */
export declare class AdapterDockerfileAST {
    content: any;
    constructor(content: any);
    searchKeyword(obj: IRequestAstDockerfile): Promise<IResponseAstDockerfile>;
}
