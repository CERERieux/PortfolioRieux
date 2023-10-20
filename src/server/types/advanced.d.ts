export interface ConverterQuery {
  input: string;
}

export interface ConvertProps {
  initialNumber: number;
  initialUnit: string;
}

export interface ConvertStringProps {
  initialNumber: number;
  initialUnitSO: string;
  resultNumber: number;
  resultUnitSO: string;
}

/** ------------------------------------------------------------------------ */

export interface SudokuBody {
  puzzle: string;
  coordinate: string;
  value: string;
}

export interface SudokuPlacement {
  puzzle: string;
  row: string;
  column: number;
  value: string;
}

/** ------------------------------------------------------------------------ */

export interface TranslatorBody {
  text: string;
  locale: string;
}

/** ------------------------------------------------------------------------ */

export interface IIssueTracker {
  project_name: string;
  issue_title: string;
  issue_text: string;
  created_by: string;
  assigned_to?: string;
  status_text?: string;
  open: boolean;
  created_on: string;
  updated_on: string;
}

export interface ReqParamsIssue {
  project: string;
}
export interface ReqParamDelete {
  _id: string;
}

export interface ReqQueryIssue {
  issue_title?: string;
  issue_text?: string;
  created_by?: string;
  assigned_to?: string;
  status_text?: string;
  open?: string;
  created_on?: string;
  updated_on?: string;
  _id?: string;
}
export interface IssueSearchParams extends ReqQueryIssue {
  project_name: string;
}

export interface ReqBodyIssue {
  issue_title?: string;
  issue_text?: string;
  created_by?: string;
  assigned_to?: string;
  status_text?: string;
  open?: boolean;
  _id?: string;
}

export interface UpdateIssue {
  project_name: string;
  issue_title?: string;
  issue_text?: string;
  created_by?: string;
  assigned_to?: string;
  status_text?: string;
  open?: boolean;
  _id: string;
}

/** ------------------------------------------------------------------------ */

export interface IBook {
  title: string;
  comments: string[];
  commentCount: number;
}

export interface ReqBodyCreateBook {
  title: string;
}
export interface ReqBodyCommentBook {
  comment: string;
}
export interface ReqParamsCommentBook {
  id: string;
}
