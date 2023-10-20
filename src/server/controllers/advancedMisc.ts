import * as AdvancedMiscModel from "../models/advancedMisc";
import type { Request, Response } from "express";
import type {
  ReqParamBoard,
  ReqReportThread,
  ReqThreadBody,
  ReqDeleteThread,
  StockQuery,
  ReqQueryReply,
  ReqCreateReplyBody,
  ReqReportReply,
  ReqDeleteReply,
} from "../types/advancedMisc";

const INVALID_FORMAT =
  "The ID you introduce has an invalid format, please revise if the ID is correct";
const MISSING_ELEMENT =
  "It seems that some elements that are needed to make this operation are missing, please verify the content of the form or the query in the url";

export async function consultStock(
  req: Request<{}, {}, {}, StockQuery>,
  res: Response,
) {
  const { stock, like, _id } = req.query;
  if (_id.length !== 24) {
    res.json("Invalid ID format, please introduce a valid ID");
  }

  const resultStock = await AdvancedMiscModel.consultStock({
    stock,
    like,
    _id,
  });
  res.json(resultStock);
}

/** ------------------------------------------------------------------------ */

export async function getTopThreads(req: Request, res: Response) {
  const _id = req.params.board.toLowerCase();
  const resultThreads = await AdvancedMiscModel.getTopThreads(_id);
  res.json(resultThreads);
}

export async function createNewThread(
  req: Request<ReqParamBoard, {}, ReqThreadBody, {}>,
  res: Response,
) {
  const _id = req.body.board ?? req.params.board;
  const text = req.body.text;
  const deletePassword = req.body.delete_password;
  if (text == null || deletePassword == null)
    res.json({ error: MISSING_ELEMENT });
  else {
    const resultCreate = await AdvancedMiscModel.createNewThread({
      _id: _id.toLowerCase(),
      text,
      deletePassword,
    });
    res.json(resultCreate);
  }
}

export async function reportThread(
  req: Request<ReqParamBoard, {}, ReqReportThread, {}>,
  res: Response,
) {
  const _id = req.body.thread_id;
  if (_id == null) res.json({ error: MISSING_ELEMENT });
  else if (_id.length !== 24) res.json({ error: INVALID_FORMAT });
  else {
    const resultReport = await AdvancedMiscModel.reportThread(_id);
    res.json(resultReport);
  }
}

export async function deleteThread(
  req: Request<ReqParamBoard, {}, {}, ReqDeleteThread>,
  res: Response,
) {
  const deletePassword = req.query.password;
  const _id = req.query.thread_id;
  if (_id == null || deletePassword == null)
    res.json({ error: MISSING_ELEMENT });
  else if (_id.length !== 24) res.json({ error: INVALID_FORMAT });
  else {
    const resultDelete = await AdvancedMiscModel.deleteThread({
      _id,
      password: deletePassword,
    });
    res.json(resultDelete);
  }
}

export async function getAllReplies(
  req: Request<ReqParamBoard, {}, {}, ReqQueryReply>,
  res: Response,
) {
  const _idBoard = req.params.board;
  const _idThread = req.query.thread_id;
  if (_idThread == null) res.json({ error: MISSING_ELEMENT });
  else if (_idThread.length !== 24) res.json({ error: INVALID_FORMAT });
  else {
    const resultQuery = await AdvancedMiscModel.getAllReplies({
      _idBoard,
      _idThread,
    });
    res.json(resultQuery);
  }
}

export async function createNewReply(
  req: Request<ReqParamBoard, {}, ReqCreateReplyBody, {}>,
  res: Response,
) {
  const _id = req.body.id_thread;
  const text = req.body.text;
  const deletePassword = req.body.delete_password;
  if (_id == null || text == null || deletePassword == null)
    res.json({ error: MISSING_ELEMENT });
  else if (_id.length !== 24) res.json({ error: INVALID_FORMAT });
  else {
    const resultCreate = await AdvancedMiscModel.createNewReply({
      _id,
      text,
      deletePassword,
    });
    res.json(resultCreate);
  }
}

export async function reportReply(
  req: Request<ReqParamBoard, {}, ReqReportReply, {}>,
  res: Response,
) {
  const _id = req.body.reply_id;
  if (_id == null) res.json({ error: MISSING_ELEMENT });
  else if (_id.length !== 24) res.json({ error: INVALID_FORMAT });
  else {
    const resultReport = await AdvancedMiscModel.reportReply(_id);
    res.json(resultReport);
  }
}

export async function deleteReply(
  req: Request<ReqParamBoard, {}, {}, ReqDeleteReply>,
  res: Response,
) {
  const deletePassword = req.query.password;
  const _id = req.query.reply_id;
  if (_id == null || deletePassword == null)
    res.json({ error: MISSING_ELEMENT });
  else if (_id.length !== 24) res.json({ error: INVALID_FORMAT });
  else {
    const resultDelete = await AdvancedMiscModel.deleteReply({
      _id,
      password: deletePassword,
    });
    res.json(resultDelete);
  }
}
