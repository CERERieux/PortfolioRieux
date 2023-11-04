import type { Types } from "mongoose";

export interface IShortenerUrl {
  originalUrl: string;
  shortUrl: string;
}
// user?: `${string}-${string}-${string}-${string}-${string}`;

export interface ValidUrlReq {
  isValid: boolean;
  original_url: string;
}

export interface ValidExtension {
  valid: boolean;
  newExtension: string;
}

export interface IExTracker {
  _id: Types.ObjectId;
  username: string;
  description: string;
  duration: number;
  date: string;
}

export interface ExerciseElements {
  _id: string;
  description: string;
  duration: number;
  date: string;
}

export interface ReqQueryLog {
  from?: string;
  to?: string;
  limit?: string;
}

export interface LogOptions extends ReqQueryLog {
  _id: string;
}
