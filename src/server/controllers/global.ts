import type { Request, Response } from "express";
import type { ReqBodyCreateUser } from "../types/global";
import * as GlobalModel from "../models/global";

export async function createUser(
  req: Request<{}, {}, ReqBodyCreateUser, {}>,
  res: Response,
) {
  const { _id, password } = req.body;
  if (_id == null || password == null)
    return res.status(400).json({ error: "Missing fields" });
  const resultCreate = await GlobalModel.createUser({ _id, password });
  if ("error" in resultCreate) return res.status(500).json(resultCreate);
  return res.status(200).json(resultCreate);
}

export async function verifyLogin(
  req: Request<{}, {}, ReqBodyCreateUser, {}>,
  res: Response,
) {
  const { _id, password } = req.body;
  if (_id == null || password == null)
    return res.status(400).json({ error: "Missing fields" });
  const resultVerify = await GlobalModel.verifyLogin({ _id, password });
  if ("error" in resultVerify) return res.status(500).json(resultVerify);
  return res.status(200).json(resultVerify);
}
