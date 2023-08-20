import { Router } from "express";
import { Service } from "typedi";
import StudentService from "../services/StudentService";

// @Service()
export default class StudentController {
  router: Router;
  studentService: StudentService;

  constructor(studentService: StudentService) {
    this.router = Router();
    this.studentService = studentService;
  }

  getStudentsRoute() {
    return this.studentService.getStudents();
  }

  routes() {
    this.router.get("/", (_req, res) => res.send(this.getStudentsRoute()));
    return this.router;
  }
}
