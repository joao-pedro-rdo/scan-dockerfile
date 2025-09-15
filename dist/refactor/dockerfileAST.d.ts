export interface IRequestAstDockerfile {
    keyword: string;
    args: string[];
}
export interface IResponseAstDockerfile {
    found: boolean;
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
    /**
     *  This method return a first match of the pattern in the dockerfile
     * @param pattern: RegExp
     * @returns Array of IResponseAstDockerfile with all matches (keyword, args, line)
     */
    searchPattern(patterns: RegExp[]): Promise<Array<IResponseAstDockerfile>>;
    /**
     * This method checks if any of the provided patterns match any instruction
     * @param patterns: RegExp[]
     */
    searchPattern2(patterns: RegExp[]): Promise<Array<IResponseAstDockerfile>>;
    searchFirstPattern(patterns: RegExp[]): Promise<IResponseAstDockerfile>;
}
