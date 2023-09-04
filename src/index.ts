import "reflect-metadata";
import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import logger from "morgan";
import { connectDb } from "./db/connect";
import { appConfig } from "./config/app";
import "express-async-errors";
import { ErrorHandler } from "./middlewares/errorhandler.middleware";
import AuthRoute from "./routes/auth.route";
dotenv.config();

const app = express();
// EJS
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(
  express.static(path.join(__dirname, "/public"), { maxAge: 31557600000 })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(logger("dev"));

// Routes
app.use("/api/v1/auth", AuthRoute);

// app.use("/students", studentController.routes());
app.get("/", (req: Request, res: Response) => {
  res.send(`<div>Welcome to Firdaus API Server<br/> </div>`);
});

app.use(ErrorHandler);
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
