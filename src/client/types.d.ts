import type {
  IBook,
  ReqBodyIssue,
  ReqQueryIssue,
} from "../server/types/advanced";
import type { IExTracker, IShortenerUrl } from "../server/types/basic";
import { type IGlobalUser } from "../server/types/global";

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
  loginAdmin: ({ username, password }: User) => Promise<boolean>;
  logoffUser: () => void;
}
export type CauseError =
  | "ExpiredToken"
  | "BadToken"
  | "NotAdmin"
  | "NotLoggedIn";
export interface ErrorAuth {
  message: string;
  cause: null | CauseError;
}

// Axios types
export type AllUsers = Pick<
  IGlobalUser,
  "_id" | "books" | "issues" | "shortUrl"
>;
export interface EmptyData {
  error: string;
  category: string;
}
export interface ResponseCreate {
  _id: Types.ObjectId;
}
export interface ResponseAction {
  action: string;
}
export interface responseLogin {
  username: string;
  token: string;
}
export type Token = Pick<responseLogin, "token">;
export interface SingleOperation {
  id: string;
  token: string;
}
export interface DeleteOperation extends SingleOperation {
  userId?: string;
}
export type DeleteLibraryService = Omit<DeleteOperation, "id">;
export type DeleteOperationHook = Omit<DeleteOperation, "token">;
export interface UserInfo {
  username: string;
  bio: string;
  img: string;
}
export type UpdateUserService = Partial<Omit<UserInfo, "username">> & Token;
export type UpdateUserHook = Omit<UpdateUserService, "token">;
export interface UserProfileHook {
  externalUser?: string;
}
export type ImgProfile =
  | "type-img-1"
  | "type-img-2"
  | "type-img-3"
  | "type-img-4"
  | "type-img-5"
  | "type-img-6";

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
export interface updateExerciseService {
  token: string;
  id: string;
  description: string;
  status: string;
}
export type ResultUpdate = Pick<IExTracker, "_id" | "description" | "status">;
export type StatusEx = "Pending" | "Completed" | "Current";

export type BookService = Omit<IBook, "username" | "notes">;
export interface CreateBookService {
  token: string;
  title: string;
  status: string;
}
export type ResultCreateBook = Pick<BookService, "_id" | "title">;
export type SingleBook = Omit<IBook, "username">;
export interface UpdateBookService extends SingleOperation {
  title?: string;
  status: string;
  review?: string;
  recommend: string;
}
export type ResultUpdateBook = Omit<BookService, "_id">;
export interface CreateNoteService extends SingleOperation {
  note: string;
}
export type ResultCreateNote = Pick<IBook, "_id" | "title" | "notes">;
export interface DeleteNoteService extends SingleOperation {
  number: string;
}
export type ResultDeleteNote = Omit<ResultCreateNote, "title">;
export type BookStatus =
  | "Plan to Read"
  | "Current Reading"
  | "Completed"
  | "Dropped/Unfinish";

export interface GetIssuesService extends ReqQueryIssue {
  token?: string;
}
export interface CreateIssueService {
  token?: string;
  project: string;
  title: string;
  text: string;
}
export interface UpdateIssueService extends ReqBodyIssue {
  token: string;
}
export type StatusIssue =
  | "Any"
  | "Pending"
  | "Read"
  | "Completed"
  | "Trying to fix"
  | "Ignored";

export interface CreateShortUrl {
  url: string;
  token: string;
}
export type UserUrls = Omit<IShortenerUrl, "username">;

export interface ViewStockData {
  stock: string | string[];
  like: boolean;
}

export interface BoardData {
  id: string;
  thread_count: number;
}
export interface CreateThreadService {
  board: string;
  text: string;
  password: string;
}
export interface ThreadOperation {
  idThread: string;
  board: string;
}
export type DeleteThread = ThreadOperation &
  Pick<CreateThreadService, "password">;
export type CreateReplyService = CreateThreadService & ThreadOperation;
export interface ReplyOperation {
  board: string;
  idReply: string;
}
export interface DeleteReply extends ReplyOperation {
  password: string;
}
