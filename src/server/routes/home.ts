import { Router } from "express";

export const homeRouter = Router();

homeRouter.route("/").get((_, res) => {
  res.redirect(301, "/home");
});

homeRouter.route("/home").get((_, res) => {
  res.json({ content: "About me,landing,etc" });
});
