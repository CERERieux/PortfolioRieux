import type { Types } from "mongoose";

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
  _id: Types.ObjectId;
  project: string;
  title: string;
  text: string;
  created_by: string;
  status: string;
  open: boolean;
  created_on: Date;
  updated_on: Date;
}

export interface ReqQueryIssue {
  _id?: string;
  project?: string;
  title?: string;
  text?: string;
  created_by?: string;
  status?: string;
  open?: string;
  created_on?: string;
  updated_on?: string;
}

export interface ReqBodyIssue {
  _id?: string;
  project?: string;
  title?: string;
  text?: string;
  status?: string;
  open?: boolean;
}

export interface CreateIssue {
  project: string;
  title: string;
  text: string;
  created_by: string;
  created_on: Date;
  updated_on: Date;
}

export interface UpdateIssue {
  title?: string;
  text?: string;
  status?: string;
  open?: boolean;
  _id: string;
}

export interface ReqParamDelete {
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
