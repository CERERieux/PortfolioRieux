import type { Types } from "mongoose";

export interface IShortenerUrl {
  _id: Types.ObjectId;
  username: string;
  originalUrl: string;
  shortUrl: string;
}

export interface UrlMaterial {
  url: string;
  username: string;
}

export interface CreateUrlMaterial extends UrlMaterial {
  newExtension: string;
}

export interface ValidUrlReq {
  isValid: boolean;
  original_url: string;
}

export interface ValidExtension {
  valid: boolean;
  newExtension: string;
}

/** ------------------------------------------------------------------------ */

export interface IExTracker {
  _id: Types.ObjectId;
  username: string;
  description: string;
  status: string;
  date: Date;
}

export interface ReqExerciseBody {
  description: string;
  status: string;
  date?: string;
}

export interface ExerciseElements {
  _id: string;
  description: string;
  status: string;
  date: Date;
}
export type UpdateExercise = Omit<ExerciseElements, "date">;

export interface ReqParam {
  _id: string;
}
export interface ReqQueryLog {
  from?: string;
  to?: string;
  limit?: string;
}
export type LogOptions = ReqQueryLog & ReqParam;
