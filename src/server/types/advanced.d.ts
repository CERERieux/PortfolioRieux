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
  project?:string;
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
  _id: Types.ObjectId;
  title: string;
  status: string;
  review: string;
  recommend: boolean | undefined;
  notes: string[];
  username: string;
}

export interface ReqBodyCreateBook {
  title: string;
  status: string;
}
export interface CreateBook extends ReqBodyCreateBook {
  username: string;
}
export interface ReqBodyNoteCreate {
  note: string;
}
export interface ReqBodyUpdateBook {
  _id: string;
  title?: string;
  status: string;
  review?: string;
  recommend: string;
}
export interface ReqParamsBook {
  id: string;
}

export interface UpdateNote extends ReqParamsBook {
  number: number;
}
export interface AdminData {
  user_id?: string;
}
