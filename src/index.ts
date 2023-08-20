import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { StudentRepository } from "./api/repositories/StudentRepository";
import StudentService from "./api/services/StudentService";
import StudentController from "./api/controllers/Student";

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

app.use("/students", studentController.routes());
app.get("/", (req: Request, res: Response) => {
  res.send(`<div>Welcome to Firdaus API Server<br/> </div>`);
});

const PORT = process.env.PORT || 4000;
const start = () => {
  app.listen(PORT, () => {
    console.log(
      `Server ⚡ is running on http://localhost:${PORT} Environment: ${process.env.NODE_ENV}`
    );
  });
};
start();
