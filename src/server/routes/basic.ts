import { Router } from "express";
import extratorUser from "../middlewares/extractorUser";
import partialExtratorUser from "../middlewares/partialExtractorUser";
import * as BasicController from "../controllers/basic";

export const basicRouter = Router();

basicRouter.route("/timestamp/:date?").get(BasicController.timestamp);
basicRouter.route("/whoami").get(BasicController.headParser);

basicRouter
  .route("/shorturl")
  .post(partialExtratorUser, BasicController.shortenerURL);
basicRouter.route("/shorturl/:user_url").get(BasicController.visitShortURL);

basicRouter
  .route("/users/exercises")
  .get(extratorUser, BasicController.displayUserLog)
  .post(extratorUser, BasicController.createNewExercise);
basicRouter
  .route("/users/exercise/:_id")
  .delete(extratorUser, BasicController.deleteExercise);

/** TODO ------------------------------------------
 * Make the multer part so you can upload files/imgs
 */
basicRouter.route("/upload").get().post().delete();
