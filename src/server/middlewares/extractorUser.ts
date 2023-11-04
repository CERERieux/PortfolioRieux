import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import type { TokenGUser } from "../types/global";

export default function extratorUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const auth = req.get("authorization");
  let token = "";
  if (auth != null && auth.toLowerCase().startsWith("bearer")) {
    token = auth.slice(7);
  }
  if (token === "")
    return res.status(401).json({ error: "Invalid or missing token" });

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_WORD as string);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: "Error at verifying your user in our services" });
  }

  if ((decodedToken as TokenGUser).username == null)
    return res.status(401).json({ error: "Invalid or missing token" });
  const _id = (decodedToken as TokenGUser).username;
  req._id = _id;
  next();
}
