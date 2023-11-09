import { Schema, model } from "mongoose";
import type { IBook, IIssueTracker } from "../types/advanced";

export const ERROR_ISSUES = {
  EMPTY_DELETE:
    "Error, don't try to delete a issue that don't exist, please send a valid ID",
  FAIL_DELETE_ALL:
    "Couldn't delete all the issues from user, please try again later",
  FAIL_CREATE: "Couldn't create your new issue, please try again later.",
  FAIL_FIND: "Error at trying to get all the issues, please try again later",
  FAIL_FIND_ID: "Error at trying to find your issue, please try again later",
  FAIL_UPDATE: "Error at trying to update your issue, please try again later",
  FORBIDDEN_ACCESS:
    "You are not admin, please do not try again access to this endpoint",
  INVALID_FORMAT: "Please introduce a valid ID format",
  MISSING_FIELDS: "Required field(s) missing",
  MISSING_ID: "Missing _id",
  MISSING_UPDATE_DATA: "No update field(s) sent",
  NOT_FOUND: "Issue not found, revise if the ID you put is correct.",
  NOT_ISSUES_FIND: "Couldn't find any issues or sugerences",
};

export const ERROR_BOOKS = {
  COULD_NOT_DELETE: "Error at deleting a book, please try again.",
  COULD_NOT_DELETE_ALL:
    "Error at deleting all books of user, please try again.",
  COULD_NOT_FIND: "Error at finding a book, please try again.",
  COULD_NOT_SAVE: "Error at saving the new book, please try again.",
  COULD_NOT_UPDATE: "Error at updating your book, please try again.",
  DELETE_EMPTY_LIBRARY: "Library was empty, you can't delete more books.",
  DELETE_EMPTY_BOOK: "No book exists",
  EMPTY_LIBRARY: "Can't find any book, library is empty, please add new books.",
  INVALID_ID: "Invalid ID, please introduce a valid ID format",
  MISSING_TITLE: "Missing required field title",
  MISSING_NOTE: "Missing required field note",
  MISSING_ID: "Missing required field id",
  NOT_FOUND:
    "Couldn't found a book matching the given ID, please try with another ID",
};

const issueTrackerSchema = new Schema<IIssueTracker>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  project: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  created_by: { type: String, required: true },
  status: { type: String, default: "Pending" },
  open: { type: Boolean, default: true },
  created_on: Date,
  updated_on: Date,
});

const bookSchema = new Schema<IBook>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  status: { type: String, default: "Plan to Read" },
  review: { type: String, default: "" },
  recommend: { type: Boolean, default: undefined },
  notes: { type: [String], default: [] },
  username: { type: String, ref: "GUser", required: true },
});

export const IssueTracker = model<IIssueTracker>(
  "IssueTracker",
  issueTrackerSchema,
);
export const Book = model<IBook>("Book", bookSchema);

/** ******************************************************************************************** */
// I want that the Schemas are the source of the constants for ERRORS and DATA until this gets bigger
// I'll save this for now since are related to the AdvancedModel

export const ERROR_CONVERTER = {
  INVALID_NUMBER: "Invalid number",
  INVALID_UNIT: "Invalid unit",
  INVALID_INPUT: "Invalid number and unit",
};

export const METRIC_UNIT = {
  L: "l",
  L_SO: "liters",
  KG: "kg",
  KG_SO: "kilograms",
  KM: "km",
  KM_SO: "kilometers",
};
export const IMPERIAL_UNIT = {
  GAL: "gal",
  GAL_SO: "gallons",
  LBS: "lbs",
  LBS_SO: "pounds",
  MI: "mi",
  MI_SO: "miles",
};
export const GAL_TO_L = 3.78541;
export const LBS_TO_KG = 0.453592;
export const MI_TO_KM = 1.60934;

export const ERROR_SUDOKU = {
  INVALID_CHARACTER: "Invalid characters in puzzle",
  INVALID_COORD: "Invalid coordinate",
  INVALID_FORMAT: "Expected puzzle to be 81 characters long",
  INVALID_VALUE: "Invalid value",
  MISSING_FIELDS: "Required field(s) missing",
  UNSOLVABLE: "Puzzle cannot be solved",
};

export const REGIONS = {
  REGION_1: "a1a2a3b1b2b3c1c2c3",
  REGION_2: "a4a5a6b4b5b6c4c5c6",
  REGION_3: "a7a8a9b7b8b9c7c8c9",
  REGION_4: "d1d2d3e1e2e3f1f2f3",
  REGION_5: "d4d5d6e4e5e6f4f5f6",
  REGION_6: "d7d8d9e7e8e9f7f8f9",
  REGION_7: "g1g2g3h1h2h3i1i2i3",
  REGION_8: "g4g5g6h4h5h6i4i5i6",
  REGION_9: "g7g8g9h7h8h9i7i8i9",
};

export const ERROR_TRANSLATOR = {
  EMPTY_TEXT: "No text to translate",
  INVALID_LOCALE: "Invalid value for locale field",
  MISSING_FIELDS: "Required field(s) missing",
};
export const AME_TO_BRIT = "american-to-british";
export const BRIT_TO_AME = "british-to-american";
