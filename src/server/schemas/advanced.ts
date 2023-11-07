import { Schema, model } from "mongoose";
import type { IBook, IIssueTracker } from "../types/advanced";

export const ERROR_ISSUES = {
  ERROR_DELETE: (_id: string) => `Could not delete issue ${_id}`,
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
  title: { type: String, required: true },
  comments: [String],
  commentCount: { type: Number, default: 0 },
});

/**
 * const bookSchema = new Schema<IBook>({
 * _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  status: String, // completed, current reading, planned
  review: String,
  recommend: Boolean,
  notes: [String],
  username: { type: String, ref: "GUser" },
});
 */

export const IssueTracker = model<IIssueTracker>(
  "IssueTracker",
  issueTrackerSchema,
);
export const Book = model<IBook>("Book", bookSchema);
