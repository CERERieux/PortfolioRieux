import type { Request, Response } from "express";
import type { ImgSelected, ReqBodyCreateUser } from "../types/global";
import * as GlobalModel from "../models/global";
import { ERROR_GUSER } from "../schemas/global";
import { gUserError } from "./error";

export async function createUser(
  req: Request<{}, {}, ReqBodyCreateUser, {}>,
  res: Response,
) {
  const { _id, password } = req.body;
  if (_id == null || password == null)
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

export async function updateImageUser(
  req: Request<{}, {}, ImgSelected, {}>,
  res: Response,
) {
  const { _id } = req;
  const { img } = req.body;
  const imgNum = parseInt(img);
  const resultUpdate = await GlobalModel.updateImageUser(_id, imgNum);
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
