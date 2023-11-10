import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { ERROR_GUSER } from "../schemas/global";

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
      decodedToken = jwt.verify(
        token,
        process.env.SECRET_WORD as string,
      ) as JwtPayload;
      // For any reason the token don't have an username, put the id as the dump user
      if (decodedToken.username == null) {
        req._id = process.env.DUMP_USER as string;
      } else {
        const _id = decodedToken.username;
        req._id = _id;
      }
    } catch (error) {
      console.error(error);
      // If token expired, send an error in case user wants to login again
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ error: ERROR_GUSER.EXPIRED_TOKEN });
      }
      // If the token its invalid, put the id as Dump user
      req._id = process.env.DUMP_USER as string;
    }
  }
  // Go to next middleware
  next();
}
