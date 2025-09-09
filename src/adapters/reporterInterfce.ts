import { promises } from "dns";
import { IGitHubActionsAdapter, IGitHubIssue } from "./githubActionsInterface";
import { info } from "console";

export interface IReporter {
  addDebug?(msg: string): void;
  info?(msg: string): void;
  summary?(obj: ISummary): void;
  addLinkIssue?(obj: addLinkIssue): void;
  newIssue?(obj: INewIssue): Promise<void>;
  newPr?(obj: INewPR): Promise<void>;
}

export interface IgithubaActionsReporters extends IReporter {
  addTableRow(arg0: {
    rule: string;
    status: string;
    details: string;
    link: string;
  }): unknown;
  // I need this interface because i cant use method newIssue? from Ireporter bcau  se is a possible undefined
  IGitHubActionsAdapter: IGitHubActionsAdapter;

  infoSuccess(text: string): void;
  infoWarning(text: string): void;
  infoError(text: string): void;
  info(text: string): void;
  newIssue(obj: INewIssue): Promise<void>;
  newIssueIfNotExists(obj: INewIssue): Promise<IGitHubIssue | null>;
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

export interface ITableRow {
  rule: string;
  status: string;
  details: string;
  link: string;
}
