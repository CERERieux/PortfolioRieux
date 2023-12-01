import { Router } from "express";
import * as AdvancedMiscController from "../controllers/advancedMisc";
import extratorUser from "../middlewares/extractorUser";

export const advancedMiscRouter = Router();

advancedMiscRouter
  .route("/stock-prices")
  .get(extratorUser, AdvancedMiscController.consultStock);

advancedMiscRouter.get("/boards", AdvancedMiscController.getAllBoards);
advancedMiscRouter
  .route("/board/:board")
  .delete(extratorUser, AdvancedMiscController.deleteBoard);

advancedMiscRouter
  .route("/threads/:board")
  .get(AdvancedMiscController.getTopThreads)
  .post(AdvancedMiscController.createNewThread)
  .put(AdvancedMiscController.reportThread)
  .delete(AdvancedMiscController.deleteThread);

advancedMiscRouter
  .route("/replies/:board")
  .get(AdvancedMiscController.getAllReplies)
  .post(AdvancedMiscController.createNewReply)
  .put(AdvancedMiscController.reportReply)
  .delete(AdvancedMiscController.deleteReply);
