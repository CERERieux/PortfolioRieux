import mongoose from "mongoose";

if (process.env.MONGO_URI !== undefined) {
  mongoose.connect(process.env.MONGO_URI);
}
