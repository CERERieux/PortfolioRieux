import { Router } from "express";
import * as AdvancedController from "../controllers/advanced";
import extratorUser from "../middlewares/extractorUser";
import partialExtratorUser from "../middlewares/partialExtractorUser";

export const advancedRouter = Router();

advancedRouter.route("/converter").get(AdvancedController.convertHandler);

advancedRouter.route("/sudoku/check").post(AdvancedController.checkSudoku);
advancedRouter.route("/sudoku/solve").post(AdvancedController.solveSudoku);

advancedRouter
  .route("/translate")
  .post(AdvancedController.translatorAmericanBritish);

advancedRouter
  .route("/issue-tracker/")
  .get(partialExtratorUser, AdvancedController.getAllIssues)
  .post(partialExtratorUser, AdvancedController.createNewIssue)
  .put(extratorUser, AdvancedController.updateIssue);
advancedRouter
  .route("/issue-tracker/:_id")
  .delete(extratorUser, AdvancedController.deleteIssue);

advancedRouter
  .route("/books")
  .get(AdvancedController.getAllBooks)
  .post(AdvancedController.createNewBook)
  .delete(AdvancedController.deleteAllBooks);
advancedRouter
  .route("/books/:id")
  .get(AdvancedController.getSingleBook)
  .post(AdvancedController.createBookComment)
  .delete(AdvancedController.deleteSingleBook);
