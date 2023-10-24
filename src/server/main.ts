import "dotenv/config";
import "./database/mongoose";
import express from "express";
import helmet from "helmet";
import ViteExpress from "vite-express";
import { basicRouter } from "./routes/basic";
import { homeRouter } from "./routes/home";
import { advancedRouter } from "./routes/advanced";
import { advancedMiscRouter } from "./routes/advancedMisc";

const app = express();
const PORT = process.env.PORT ?? "3000";
const directives = {
  scriptSrc: ["'self'", process.env.SHA_CODE as string],
  connectSrc: ["'self'", "ws:", "https:"],
  imgSrc: ["'self'", "data:", "https:"],
};

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives,
    },
  }),
);

app.use("/", homeRouter);
app.use("/basic", basicRouter);
app.use("/advanced", advancedRouter);
app.use("/advanced-misc", advancedMiscRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
ViteExpress.bind(app, server);
