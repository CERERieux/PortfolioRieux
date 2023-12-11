import { Router } from "express";
import * as GlobalController from "../controllers/global";
import extratorUser from "../middlewares/extractorUser";

export const globalRouter = Router();

globalRouter
  .route("/user")
  .post(GlobalController.createUser)
  .put(extratorUser, GlobalController.updateUser)
  .delete(extratorUser, GlobalController.deleteUser);
globalRouter.route("/user/:_id").get(GlobalController.getUserBasicInfo);
globalRouter.route("/verify-user").post(GlobalController.verifyLogin);
globalRouter.route("/verify-admin").post(GlobalController.verifyAdmin);
globalRouter.route("/verify-token").post(GlobalController.verifyToken);
globalRouter
  .route(`/${process.env.ROUTE_ADMIN}/admin`)
  .get(extratorUser, GlobalController.getAllUsers);
