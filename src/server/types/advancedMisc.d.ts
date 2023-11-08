import type { Types, Document } from "mongoose";

export interface IClientStock {
  _id: Types.ObjectId;
  username: string;
  liked: Map<string, boolean>;
  stocks: IStocks[];
}

export interface IStocks {
  _id: Types.ObjectId;
  stockname: string;
  likes: number;
  clients: IClientStock[];
}

export interface ReqStockQuery {
  stock?: string | string[];
  like?: string;
}
export interface StockQuery {
  stock: string | string[];
  like: string;
  _id: string;
}

export type ClientDocument = Document<unknown, {}, IClientStock> & IClientStock;
export type StockDocument = Document<unknown, {}, IStocks> & IStocks;
export interface LikeStock {
  currentClient: ClientDocument;
  stock: string | string[];
  like: string;
}

export interface OperationStocks {
  currentClient: ClientDocument;
  stock: string;
}

export interface StockAPI {
  change: string;
  changePercent: string;
  close: string;
  high: string;
  latestPrice: string;
  latestTime: string;
  latestVolume: string;
  low: string;
  open: string;
  previousClose: string;
  symbol: string;
  volume: string;
}

export interface SingleConsultStock {
  stock: string;
  price: string;
  likes: number;
}
export interface GroupConsultStock {
  stock: string;
  price: string;
  rel_likes: number;
}
export interface IStocksData {
  stockData: GroupConsultStock[];
}

/** ------------------------------------------------------------------------ */

export interface IBoard {
  _id: string;
  threads: IThread[];
}

export interface IThread {
  _id: Types.ObjectId;
  text: string;
  created_on: string;
  bumped_on: string;
  reported: boolean;
  delete_password: string;
  replies: IReply[];
}

export interface IReply {
  _id: Types.ObjectId;
  thread_id: string;
  text: string;
  created_on: string;
  reported: boolean;
  delete_password: string;
}
export type BoardDocument = Document<unknown, {}, IBoard> & IBoard;
export type ThreadDocument = Document<unknown, {}, IThread> & IThread;
export type ReplyDocument = Document<unknown, {}, IReply> & IReply;

export interface IThreadFiltered {
  _id: Types.ObjectId;
  text: string;
  created_on: string;
  bumped_on: string;
  replies: IReplyFiltered[];
  replycount: number;
}
export interface IReplyFiltered {
  _id: Types.ObjectId;
  created_on: string;
  text: string;
}

export interface ReqParamBoard {
  board: string;
}
export interface UserDataCreate {
  _id: string;
  text: string;
  deletePassword: string;
}
export interface DeleteElementBoard {
  _id: string;
  password: string;
}

export interface ReqThreadBody {
  board: string;
  text: string;
  delete_password: string;
}
export interface ReqReportThread {
  thread_id: string;
}
export interface ReqDeleteThread {
  board: string;
  thread_id: string;
  password: string;
}
export interface CreateThread {
  board: BoardDocument;
  text: string;
  deletePassword: string;
}

export interface ReqQueryReply {
  thread_id: string;
}
export interface ReqCreateReplyBody extends ReqThreadBody {
  id_thread: string;
}
export interface ReqReportReply {
  reply_id: string;
}
export interface ReqDeleteReply extends ReqDeleteThread {
  reply_id: string;
}
export interface GetReplies {
  _idBoard: string;
  _idThread: string;
}
