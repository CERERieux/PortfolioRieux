import "dotenv/config";
import "./database/mongoose";
import express from "express";
import helmet from "helmet";
import ViteExpress from "vite-express";
import { basicRouter } from "./routes/basic";
import { homeRouter } from "./routes/home";
import { advancedRouter } from "./routes/advanced";
import { advancedMiscRouter } from "./routes/advancedMisc";
import { globalRouter } from "./routes/global";

const app = express();
const PORT = process.env.PORT ?? "3000";
const directives = {
  scriptSrc: ["'self'", process.env.SHA_CODE ?? ""],
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
app.use(`/${process.env.VITE_ROUTE_API}/global`, globalRouter);
app.use(`/${process.env.VITE_ROUTE_API}/basic`, basicRouter);
app.use(`/${process.env.VITE_ROUTE_API}/advanced`, advancedRouter);
app.use(`/${process.env.VITE_ROUTE_API}/advanced-misc`, advancedMiscRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
ViteExpress.bind(app, server);
