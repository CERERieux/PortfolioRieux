import { Router } from "express";
import * as AdvancedController from "../controllers/advanced";
import extratorUser from "../middlewares/extractorUser";
import partialExtratorUser from "../middlewares/partialExtractorUser";

export const advancedRouter = Router();

advancedRouter.route("/converter").get(AdvancedController.convertHandler);

advancedRouter.route("/sudoku/puzzle").get(AdvancedController.getPuzzle)
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
  .get(extratorUser, AdvancedController.getAllBooks)
  .post(extratorUser, AdvancedController.createNewBook)
  .delete(extratorUser, AdvancedController.deleteAllBooks);
advancedRouter
  .route("/books/:id")
  .get(extratorUser, AdvancedController.getSingleBook)
  .post(extratorUser, AdvancedController.createBookNote)
  .put(extratorUser, AdvancedController.updateBook)
  .delete(extratorUser, AdvancedController.deleteSingleBook);
advancedRouter
  .route("/books/note/:id")
  .put(extratorUser, AdvancedController.deleteBookNote);
advancedRouter
  .route("/books/external/:user")
  .get(AdvancedController.getUserBooks);
