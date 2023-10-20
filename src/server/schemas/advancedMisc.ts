import { Schema, model } from "mongoose";
import type {
  IBoard,
  IClientStock,
  IReply,
  IStocks,
  IThread,
} from "../types/advancedMisc";

const clientSchema = new Schema<IClientStock>({
  _id: { type: Schema.Types.ObjectId, required: true },
  liked: { type: Map, of: Boolean },
  stocks: [{ type: Schema.Types.ObjectId, ref: "Stocks" }],
});

const stockSchema = new Schema<IStocks>({
  _id: String,
  likes: { type: Number, default: 0 },
  clients: [{ type: Schema.Types.ObjectId, ref: "Clients" }],
});

const boardSchema = new Schema<IBoard>({
  _id: { type: String, required: true },
  threads: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
});

const threadSchema = new Schema<IThread>({
  _id: { type: Schema.Types.ObjectId },
  text: { type: String, required: true },
  created_on: { type: String, default: new Date().toISOString() },
  bumped_on: { type: String, default: new Date().toISOString() },
  reported: { type: Boolean, default: false },
  delete_password: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
});

const replySchema = new Schema<IReply>({
  _id: { type: Schema.Types.ObjectId },
  thread_id: { type: String, required: true },
  text: { type: String, required: true },
  created_on: { type: String, default: new Date().toISOString() },
  reported: { type: Boolean, default: false },
  delete_password: { type: String, required: true },
});

export const Clients = model<IClientStock>("Clients", clientSchema);
export const Stocks = model<IStocks>("Stocks", stockSchema);
export const Board = model<IBoard>("Board", boardSchema);
export const Thread = model<IThread>("Thread", threadSchema);
export const Reply = model<IReply>("Reply", replySchema);
