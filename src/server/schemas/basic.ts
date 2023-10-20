import { Schema, model } from "mongoose";
import type { IShortenerUrl, IUser, IExTracker } from "../types/basic";

const shortUrlSchema = new Schema<IShortenerUrl>({
  shortUrl: { type: String, required: true },
  originalUrl: { type: String, required: true },
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  count: { type: Number, default: 0 },
  log: [{ type: Schema.Types.ObjectId, ref: "ExTracker" }],
});

const exTrackerSchema = new Schema<IExTracker>({
  username: { type: Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

export const Url = model<IShortenerUrl>("Url", shortUrlSchema);
export const User = model<IUser>("User", userSchema);
export const ExTracker = model<IExTracker>("ExTracker", exTrackerSchema);
