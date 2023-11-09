import { Schema, model } from "mongoose";
import type { IShortenerUrl, IExTracker } from "../types/basic";

export const ERROR_URL = {
  COULD_NOT_DELETE: "Couldn't delete your shortURL, please try again later",
  COULD_NOT_DELETE_ALL:
    "Couldn't delete all the shortURL of user, please try again later",
  COULD_NOT_FIND: "Couldn't find your shortURL, please try again later",
  COULD_NOT_SAVE: "Couldn't save your new shortURL, please try again later",
  EMPTY_URL: "Please put an URL in the form",
  EMPTY_USER_URL:
    "Looks like you haven't create any short URL, try creating one!",
  INVALID_FORMAT:
    "Invalid format, please put an URL with the format http(s)://hostname.com",
  LOOKUP:
    "Error at trying to verify if URL is a valid hostname, verify if the URL is correct or try again later",
  URL_NOT_EXIST: "Error: This short URL doesn't exist, please put a valid URL",
};

export const ERROR_EXERCISE = {
  COULD_NOT_FIND_EX:
    "Could not find the exercise you needed, please try again later",
  EXERCISE_NOT_FOUND:
    "The exercise doesn't exist in database, check if the exerciseID you entered is correct",
  ID_FORMAT:
    "The ID you entered doesn't match the required format, please put a valid ID format",
  PROBLEM_DELETE:
    "Error at trying to delete the exercise you asked us to delete, please try again",
  PROBLEM_DELETE_ALL:
    "Error at trying to delete all exercises from user, please try again",
  PROBLEM_POST: "Error at trying to create a new exercise, please try again",
  PROBLEM_PUT:
    "Error at trying to update your exercise, please try again later",
  PROBLEM_UPDATE_USER:
    "Error at trying to update user's new exercise, please try again",
};

const shortUrlSchema = new Schema<IShortenerUrl>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  username: { type: String, ref: "GUser" },
  shortUrl: { type: String, required: true },
  originalUrl: { type: String, required: true },
});

const exTrackerSchema = new Schema<IExTracker>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  username: { type: String, ref: "GUser" },
  description: { type: String, required: true },
  status: { type: String, default: "Unfinished" },
  date: { type: Date },
});

export const Url = model<IShortenerUrl>("Url", shortUrlSchema);
export const ExTracker = model<IExTracker>("ExTracker", exTrackerSchema);
