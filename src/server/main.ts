import "dotenv/config";
import "./database/mongoose";
import express from "express";
import ViteExpress from "vite-express";
import { basicRouter } from "./routes/basic";
import { homeRouter } from "./routes/home";
import { advancedRouter } from "./routes/advanced";
import { advancedMiscRouter } from "./routes/advancedMisc";

const app = express();
const PORT = process.env.PORT ?? "3000";

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", homeRouter);
app.use("/basic", basicRouter);
app.use("/advanced", advancedRouter);
app.use("/advanced-misc", advancedMiscRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
ViteExpress.bind(app, server);
