import { Schema, model } from "mongoose";
import type { IGlobalUser } from "../types/global";

export const ERROR_GUSER = {
  COULD_NOT_CREATE: "Error at trying to create a new user, please try again",
  COULD_NOT_DELETE:
    "Could not delete the user you needed, please try again later",
  COULD_NOT_FIND: "Could not find the user you needed, please try again later",
  COULD_NOT_SAVE: "Can't save any user right now, please try again later",
  COULD_NOT_UPDATE: "Can't update any user right now, please try again later",
  EXPIRED_TOKEN: "Your token expired, please login again",
  ERROR_VERIFY_TOKEN: "Error at verifying your user in our services",
  INCORRECT_CREDENTIALS:
    "The username or password are incorrect, please introduce a valid pair of information",
  MISSING_FIELDS: "There are 1 or more field missing to perform this operation",
  MISSING_TOKEN: "Invalid or missing token",
  NOT_ADMIN:
    "You are NOT an admin, please do not try to login in this endpoint again.",
  USER_EXIST: "The username is already taken, please introduce a new one",
  USER_NOT_FOUND:
    "Oh... Somehow you are trying to use our services without being logged in, please login or create a new user before using this service.",
};

const generateImgNumber = () => {
  return Math.floor(Math.random() * 6);
};

const gUserSchema = new Schema<IGlobalUser>({
  _id: { type: String, required: true },
  password: { type: String, required: true },
  img: { type: String, default: `type-img-${generateImgNumber()}` },
  exercises: [{ type: Schema.Types.ObjectId, default: [], ref: "ExTracker" }],
  issues: [{ type: Schema.Types.ObjectId, default: [], ref: "IssueTracker" }],
  books: [{ type: Schema.Types.ObjectId, default: [], ref: "Book" }],
  shortUrl: [{ type: Schema.Types.ObjectId, default: [], ref: "Url" }],
});

export const GUser = model<IGlobalUser>("GUser", gUserSchema);
