import type { IExTracker } from "../server/types/basic";

export interface Welcome {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export interface ReqData {
  ipaddress: string;
  language: string[];
  software: string;
}

export interface TimeStampData {
  unix: number;
  utc: string;
}

export interface ShortUrlResult {
  original_url: string;
  short_url: string;
}

export interface ConversionResult {
  initNum: number;
  initUnit: string;
  returnNum: number;
  returnUnit: string;
  string: string;
}

export interface TranslateResult {
  text: string;
  translation: string;
}

export interface BoardQuery {
  id: string;
  thread_count: number;
}

export interface ThreadQuery {
  _id: string;
  text: string;
  created_on: string;
  bumped_on: string;
  replies: Reply[];
  replycount: number;
}

export interface Reply {
  _id: string;
  text: string;
  created_on: string;
}

export interface ErrorQuery {
  error: string;
}

export interface CreateThread {
  board: string;
  text: string;
  password: string;
}

/** ----------------------------------------------------------------------- */

export interface User {
  username: string;
  password: string;
}
export interface UserState {
  username: string;
  token: string;
  error: null | string;
  action: null | string;
  verifyToken: (token: string) => Promise<string>;
  createUser: ({ username, password }: User) => Promise<boolean>;
  loginUser: ({ username, password }: User) => Promise<boolean>;
  logoffUser: () => void;
}
export interface ErrorAuth {
  message: string;
  cause: null | "ExpiredToken" | "BadToken";
}

// Axios types
export interface responseCreate {
  action: string;
}
export interface responseLogin {
  username: string;
  token: string;
}
export interface ExerciseData {
  token: string;
  from?: string;
  to?: string;
  limit?: string;
}

export interface resGetExercise {
  username: string;
  count: number;
  log: IExTracker[];
}
export interface NewExercise {
  token: string;
  description: string;
  status: string;
  date?: Date;
}
export type NewExerciseHook = Omit<NewExercise, "token">;
export type StatusEx = "Pending" | "Completed" | "Deleted" | "Current";
export interface DeleteExercise {
  id: string;
  token: string;
}
export type DeleteExerciseHook = Omit<DeleteExercise, "token">;
