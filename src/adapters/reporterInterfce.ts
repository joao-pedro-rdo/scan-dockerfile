import { promises } from "dns";
import { IGitHubActionsAdapter } from "./githubActionsInterface";
import { info } from "console";

export interface IReporter {
  addDebug?(msg: string): void;
  info?(): void;
  summary?(obj: ISummary): void;
  addLinkIssue?(obj: addLinkIssue): void;
  newIssue?(obj: INewIssue): Promise<void>;
  newPr?(obj: INewPR): Promise<void>;
}

export interface IgithubaActionsReporters extends IReporter {
  // I need this interface because i cant use method newIssue? from Ireporter bcause is a possible undefined
  IGitHubActionsAdapter: IGitHubActionsAdapter;
  newIssue(obj: INewIssue): Promise<void>;
  infoSuccess(text: string): void;
  infoWarning(text: string): void;
  infoError(text: string): void;
  info(text: string): void;
}

export interface INewIssue {
  title: string;
  body: string;
  labels: string[];
}

export interface INewPR {
  title: string;
  body: string;
  head: string;
}

export interface ISummary {
  title: string;
  summary: string;
}

export interface addLinkIssue {
  text: string;
  link: string;
}
