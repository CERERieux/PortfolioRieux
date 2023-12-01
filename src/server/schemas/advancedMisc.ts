import { Schema, model } from "mongoose";
import type {
  IBoard,
  IClientStock,
  IReply,
  IStocks,
  IThread,
} from "../types/advancedMisc";

export const ERROR_STOCK = {
  CREATING_CLIENT: "Couldn't create new client, please try again later",
  CREATING_STOCK: "Couldn't create new stock, please try again later",
  FAIL_FETCH: "Couldn't get the info of the user stock, please try again later",
  FINDING_ALL_CLIENTS:
    "Couldn't get all clients due a problem, please try again later.",
  FINDING_STOCK: "Couldn't find the user stock, please try again later",
  INVALID: "Invalid symbol",
  MISSING_ELEMENTS: "Please introduce the correct query to use this function",
  PUTTING_LIKES:
    "Couldn't assign the likes to the wanted stock, please try again later",
  UPDATE_STOCK: "Couldn't update the user stock, please try again later",
};

export const ERROR_BOARD = {
  COULD_NOT_GET_ALL_BOARDS:
    "We couldn't recover the boards from our database, please try again later",
  COULD_NOT_DELETE_BOARD:
    "We couldn't delete the board you wanted, please try again later",
  COULD_NOT_FIND_BOARD:
    "We couldn't find the board you needed to make the operation, please try again later",
  COULD_NOT_SAVE_BOARD:
    "Couldn't save the board threads update in the required board, please try again later",
  COULD_NOT_DELETE_REPLY:
    "We couldn't delete the reply of the thread you wanted to delete, please try again later",
  COULD_NOT_FIND_REPLY:
    "We couldn't find the reply you needed to make the operation, please try again later",
  COULD_NOT_FIND_ID_REPLY:
    "The ID reply you introduce don't exist, revise that your ID is correct or exist",
  COULD_NOT_SAVE_REPLY:
    "Couldn't save the new reply in the required thread, please try again later",
  COULD_NOT_UPDATE_REPLY:
    "Couldn't update the reply information with your data, please try again later",
  COULD_NOT_DELETE_THREAD:
    "We couldn't delete the thread you needed, please try again later",
  COULD_NOT_FIND_THREAD:
    "We couldn't find the thread you wanted to make your operation, please try again later",
  COULD_NOT_FIND_ID_THREAD:
    "The ID thread you introduce don't exist, revise that your ID is correct or exist",
  COULD_NOT_SAVE_THREAD:
    "Couldn't save the new thread in the required board, please try again later",
  COULD_NOT_UPDATE_THREAD:
    "Couldn't update the thread information with your data, please try again later",
  EMPTY_BOARD:
    "There is not a board with the name you introduce, please post in a existent board or create a new one posting a thread on it",
  EMPTY_ALL_BOARDS:
    "Right now we have 0 boards created, please start a new one creating a thread about the topic you want to talk about",
  INCORRECT_PASSWORD:
    "The password you introduce to delete is incorrect, please revise if your password is the correct one",
  INVALID_FORMAT:
    "The ID you introduce has an invalid format, please revise if the ID is correct",
  MISSING_ELEMENT:
    "It seems that some elements that are needed to make this operation are missing, please verify the content of the form or the query in the url",
};

export const ACTION_BOARD = {
  DELETE_THREAD_SUCCESS: "Your thread was sucessfully deleted",
  DELETE_REPLY_SUCCESS: "Your reply was sucessfully deleted",
  REPORT_REPLY_SUCCESS: "Your reply report was sucessfully sent to our servers",
  REPORT_THREAD_SUCCESS:
    "Your thread report was sucessfully sent to our servers",
};

const clientSchema = new Schema<IClientStock>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true },
  liked: { type: Map, of: Boolean },
  stocks: [{ type: Schema.Types.ObjectId, ref: "Stock" }],
});

const stockSchema = new Schema<IStocks>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  stockname: String,
  likes: { type: Number, default: 0 },
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
});

const boardSchema = new Schema<IBoard>({
  _id: { type: String, required: true },
  threads: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
});

const threadSchema = new Schema<IThread>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  text: { type: String, required: true },
  created_on: { type: String, default: new Date().toISOString() },
  bumped_on: { type: String, default: new Date().toISOString() },
  reported: { type: Boolean, default: false },
  delete_password: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
});

const replySchema = new Schema<IReply>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  thread_id: { type: String, required: true },
  text: { type: String, required: true },
  created_on: { type: String, default: new Date().toISOString() },
  reported: { type: Boolean, default: false },
  delete_password: { type: String, required: true },
});

export const Client = model<IClientStock>("Client", clientSchema);
export const Stock = model<IStocks>("Stock", stockSchema);
export const Board = model<IBoard>("Board", boardSchema);
export const Thread = model<IThread>("Thread", threadSchema);
export const Reply = model<IReply>("Reply", replySchema);
