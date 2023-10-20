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

export interface IUser {
  username: string;
  count: number;
  log: ExTracker[];
}

export interface IExTracker {
  username: User;
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

export interface LogOptions {
  from?: string;
  to?: string;
  limit?: string;
  _id: string;
}

export interface ReqParamsLog {
  _id: string;
}

export interface ReqQueryLog {
  from?: string;
  to?: string;
  limit?: string;
}

export interface Error {
  error: string;
}

export interface DeleteResult {
  delete: {
    user: string;
    no_exercise: number;
  };
}
