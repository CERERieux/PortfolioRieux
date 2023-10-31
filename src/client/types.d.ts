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
