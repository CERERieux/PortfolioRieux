import { Router } from "express";
import * as BasicController from "../controllers/basic";

export const basicRouter = Router();

basicRouter.route("/timestamp/:date?").get(BasicController.timestamp);
basicRouter.route("/whoami").get(BasicController.headParser);

basicRouter.route("/shorturl").post(BasicController.shortenerURL);
basicRouter.route("/shorturl/:user_url").get(BasicController.visitShortURL);

basicRouter
  .route("/users")
  .get(BasicController.getAllUsers)
  .post(BasicController.createUser);
basicRouter.route("/users/:_id").delete(BasicController.deleteUser);
basicRouter.route("/users/:_id/logs").get(BasicController.displayUserLog);
basicRouter
  .route("/users/exercise/:_id")
  .delete(BasicController.deleteExercise);
basicRouter
  .route("/users/:_id/exercises")
  .post(BasicController.createNewExercise);

/** TODO ------------------------------------------
 * Make the multer part so you can upload files/imgs
 */
basicRouter.route("/upload").get().post().delete();
