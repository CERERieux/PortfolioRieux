import { Router } from "express";
import * as AdvancedMiscController from "../controllers/advancedMisc";

export const advancedMiscRouter = Router();

advancedMiscRouter
  .route("/stock-prices")
  .get(AdvancedMiscController.consultStock);

advancedMiscRouter.get("/boards", AdvancedMiscController.getAllBoards);

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
