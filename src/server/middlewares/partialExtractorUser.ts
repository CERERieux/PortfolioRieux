import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import type { TokenGUser } from "../types/global";

/** Function that extract the user depending if there is a token or not */
export default function partialExtratorUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Get the authorization header from request
  const auth = req.get("authorization");
  let token = "";
  // If it exist, get the token
  if (auth != null && auth.toLowerCase().startsWith("bearer")) {
    token = auth.slice(7);
  }
  // In case user isn't logged in, we put an "dump" user ID
  if (token === "") {
    // It don't exist but we need an username for short url that are made for not logged in people
    req._id = process.env.DUMP_USER as string;
  } else {
    // If token exist, we get it to decode it and send the username in the request
    let decodedToken;
    // Decode the token, if there is an error, send it
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_WORD as string);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ error: "Error at verifying your user in our services" });
    }
    // For any reason the token don't have an username, put the id as the dump user
    if ((decodedToken as TokenGUser).username == null) {
      req._id = process.env.DUMP_USER as string;
    } else {
      const _id = (decodedToken as TokenGUser).username;
      req._id = _id;
    }
  }
  // Go to next middleware
  next();
}
