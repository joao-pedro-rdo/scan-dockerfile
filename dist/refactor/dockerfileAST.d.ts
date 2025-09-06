export interface IRequestAstDockerfile {
    keyword: string;
    args: string[];
}
export interface IResponseAstDockerfile {
    keyword: string[];
    args: string[];
    line: number[];
}
export declare class AdapterDockerfileAST {
    content: any;
    constructor(content: any);
    searchKeyword(obj: IRequestAstDockerfile): Promise<IResponseAstDockerfile>;
}
