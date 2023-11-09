import { Router } from "express";
import * as GlobalController from "../controllers/global";
import extratorUser from "../middlewares/extractorUser";

export const globalRouter = Router();

globalRouter
  .route("/user")
  .post(GlobalController.createUser)
  .put(extratorUser, GlobalController.updateImageUser)
  .delete(extratorUser, GlobalController.deleteUser);
globalRouter.route("/verify-user").post(GlobalController.verifyLogin);
