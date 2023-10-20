import { Schema, model } from "mongoose";
import type { IBook, IIssueTracker } from "../types/advanced";

const issueTrackerSchema = new Schema<IIssueTracker>({
  project_name: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: String,
  status_text: String,
  open: Boolean,
  created_on: String,
  updated_on: String,
});

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  comments: [String],
  commentCount: { type: Number, default: 0 },
});

export const IssueTracker = model<IIssueTracker>(
  "IssueTracker",
  issueTrackerSchema,
);
export const Book = model<IBook>("Book", bookSchema);
