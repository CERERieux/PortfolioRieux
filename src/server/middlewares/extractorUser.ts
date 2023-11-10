import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { ERROR_GUSER } from "../schemas/global";

/** Function that gets username to do operations */
export default function extratorUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Get the "Authorization" header
  const auth = req.get("authorization");
  let token = "";
  // If it exist and it's "valid", get the token
  if (auth != null && auth.toLowerCase().startsWith("bearer")) {
    token = auth.slice(7);
  }
  // If token don't exist, return an error
  if (token === "")
    return res.status(401).json({ error: ERROR_GUSER.MISSING_TOKEN });

  // Try to decode the token, if is invalid or expired, send an error
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      process.env.SECRET_WORD as string,
    ) as JwtPayload;
  } catch (error) {
    console.error(error);
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: ERROR_GUSER.EXPIRED_TOKEN });
    }
    return res.status(401).json({ error: ERROR_GUSER.ERROR_VERIFY_TOKEN });
  }
  // If for any reason, token don't have an username, return an error
  if (decodedToken.username == null)
    return res.status(401).json({ error: ERROR_GUSER.MISSING_TOKEN });
  // If everything went well, put the username to the request
  const _id = decodedToken.username;
  req._id = _id;
  // Todo put a new token sign here to extend life of token and put it in local storage again to replace new one
  // And lastly, go to the next middleware
  next();
}
