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

export interface ValidUrlReq {
  isValid: boolean;
  original_url: string;
}

export interface CreateUrlMaterial {
  newExtension: string;
  url: string;
  username: string;
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
