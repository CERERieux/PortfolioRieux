import { Router } from "express";
import * as GlobalController from "../controllers/global";

export const globalRouter = Router();

globalRouter.route("/user").post(GlobalController.createUser);
globalRouter.route("/verify-user").post(GlobalController.verifyLogin);

/* TODO: Delete user */
