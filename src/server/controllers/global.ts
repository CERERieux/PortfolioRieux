import type { Request, Response } from "express";
import type { ReqBodyCreateUser, UpdateUserBody } from "../types/global";
import * as GlobalModel from "../models/global";
import { ERROR_GUSER } from "../schemas/global";
import { gUserError } from "./error";

export async function getUserBasicInfo(req: Request, res: Response) {
  const { _id } = req.params;
  const resultUser = await GlobalModel.getUserBasicInfo(_id);
  if ("error" in resultUser && resultUser.error !== undefined) {
    const status = gUserError(resultUser);
    return res.status(status).json(resultUser);
  }
  return res.status(200).json(resultUser);
}

export async function createUser(
  req: Request<{}, {}, ReqBodyCreateUser, {}>,
  res: Response,
) {
  const { _id, password } = req.body;
  if (_id == null || password == null || _id === "" || password === "")
    return res.status(400).json({ error: ERROR_GUSER.MISSING_FIELDS });
  // Create the user with user data
  const resultCreate = await GlobalModel.createUser({
    _id: _id.toLowerCase(),
    password,
  });
  if ("error" in resultCreate) {
    const status = gUserError(resultCreate);
    return res.status(status).json(resultCreate);
  }
  return res.status(201).json(resultCreate);
}

export async function verifyLogin(
  req: Request<{}, {}, ReqBodyCreateUser, {}>,
  res: Response,
) {
  const { _id, password } = req.body;
  if (_id == null || password == null)
    return res.status(400).json({ error: ERROR_GUSER.MISSING_FIELDS });
  // Verify user login
  const resultVerify = await GlobalModel.verifyLogin({
    _id: _id.toLowerCase(),
    password,
  });
  if ("error" in resultVerify) {
    const status = gUserError(resultVerify);
    return res.status(status).json(resultVerify);
  }
  return res.status(200).json(resultVerify);
}

export async function verifyAdmin(
  req: Request<{}, {}, ReqBodyCreateUser, {}>,
  res: Response,
) {
  const { _id, password } = req.body;
  if (_id == null || password == null)
    return res.status(400).json({ error: ERROR_GUSER.MISSING_FIELDS });
  // Verify user login
  const resultVerify = await GlobalModel.verifyLogin({
    _id,
    password,
  });
  if ("error" in resultVerify) {
    const status = gUserError(resultVerify);
    return res.status(status).json(resultVerify);
  }
  if (resultVerify.username !== process.env.ADMIN)
    return res.status(401).json({ error: ERROR_GUSER.NOT_ADMIN });
  return res.status(200).json(resultVerify);
}

export async function updateUser(
  req: Request<{}, {}, UpdateUserBody, {}>,
  res: Response,
) {
  const { _id } = req;
  const { img, bio } = req.body;
  const resultUpdate = await GlobalModel.updateUser({
    _id,
    img: img ?? "-1",
    bio,
  });
  if ("error" in resultUpdate && resultUpdate.action === undefined) {
    const status = gUserError(resultUpdate);
    return res.status(status).json(resultUpdate);
  }
  return res.status(200).json(resultUpdate);
}

export async function deleteUser(req: Request, res: Response) {
  const { _id } = req;
  const deleteResult = await GlobalModel.deleteUser(_id);
  if ("error" in deleteResult && deleteResult.action === undefined) {
    const status = gUserError(deleteResult);
    return res.status(status).json(deleteResult);
  }
  return res.status(200).json(deleteResult);
}

export async function verifyToken(
  req: Request<{}, {}, { token: string }, {}>,
  res: Response,
) {
  const { token } = req.body;
  const resultVerify = await GlobalModel.verifyToken(token);
  if ("error" in resultVerify && resultVerify.newToken === undefined) {
    const status = gUserError(resultVerify);
    return res.status(status).json(resultVerify);
  }
  return res.status(200).json(resultVerify);
}
