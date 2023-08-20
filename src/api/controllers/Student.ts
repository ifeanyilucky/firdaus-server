import { Router } from "express";
import { Inject, Service } from "typedi";
import { JsonController, Get } from "routing-controllers";
import StudentService from "../services/StudentService";

// @Service()
@JsonController()
export default class StudentController {
  router: Router;
  studentService: StudentService;

  constructor(studentService: StudentService) {
    this.router = Router();
    this.studentService = studentService;
  }
  @Get("/students")
  getStudentsRoute() {
    return this.studentService.getStudents();
  }

  @Get("/students/report-card")
  getStudentReport() {
    return this.studentService.getStudentReport();
  }

  routes() {
    this.router.get("/", (_req, res) => res.send(this.getStudentsRoute()));
    this.router.get("/report-card", (req, res) => {
      res.send(this.getStudentReport());
    });
    return this.router;
  }
}
