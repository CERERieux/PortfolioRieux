import { Schema, model } from "mongoose";
import type { IShortenerUrl, IExTracker } from "../types/basic";

const shortUrlSchema = new Schema<IShortenerUrl>({
  shortUrl: { type: String, required: true },
  originalUrl: { type: String, required: true },
});

const exTrackerSchema = new Schema<IExTracker>({
  _id: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, ref: "GUser" },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

export const Url = model<IShortenerUrl>("Url", shortUrlSchema);
export const ExTracker = model<IExTracker>("ExTracker", exTrackerSchema);
