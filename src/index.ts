import express, { Application, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import logger from "morgan";
import { connectDb } from "./db/connect";
import { appConfig } from "./config/app";
import "express-async-errors";
import { ErrorHandler } from "./middlewares/errorhandler.middleware";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import APIV1Route from "./routes";
import { NotFound } from "./middlewares/notfound.middleware";
import YAML from "yamljs";
import cors from "cors";

dotenv.config();

const app: Application = express();
// EJS
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(
  express.static(path.join(__dirname, "/public"), { maxAge: 31557600000 })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(logger("dev"));

app.use(cors());
// Routes
app.use("/api/v1", APIV1Route);

// app.use("/students", studentController.routes());
app.get("/", (req: Request, res: Response) => {
  res.send(
    `<div>Welcome to Firdaus API Server<br/> <a href="/api-docs">Click here 👽👻</a> to navigate to API documentation </div>`
  );
});

app.use(NotFound);
app.use(ErrorHandler);
const swaggerDocument = YAML.load(path.join(__dirname, "./docs/swagger.yaml"));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);
const PORT = process.env.PORT || 4000;
const start = async (): Promise<void> => {
  try {
    await connectDb(appConfig.databaseUrl as string);
    app.listen(PORT, () => {
      console.log(
        `Server ⚡ is running on http://localhost:${PORT} Environment: ${process.env.NODE_ENV}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
start();
