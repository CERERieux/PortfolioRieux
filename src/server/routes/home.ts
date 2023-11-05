import { Router } from "express";
import { visitShortURL } from "../controllers/basic";

export const homeRouter = Router();

homeRouter.route("/").get((_, res) => {
  res.redirect(301, "/home");
});
homeRouter.route("/url/:user_url").get(visitShortURL);
