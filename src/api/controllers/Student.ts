import { Router } from "express";
import { Inject, Service } from "typedi";
import { JsonController, Controller, Get } from "routing-controllers";
import StudentService from "../services/StudentService";
import { Student } from "../../types/User";
import { htmlToPdf } from "../../utils/html-to-pdf";

@Service("StudentController")
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
    // return this.studentService.getStudents();
    return "hello world, its Node js right here";
  }

  @Get("/students/report-card")
  getStudentReport() {
    // return this.studentService.getStudentReport();''
    const students: Student[] = [
      {
        first_name: "Oluwaferanmi",
        last_name: "Emmanuel",
        age: 20,
        class: "JSS1",
        admission_no: 1908812,
      },
      {
        first_name: "Ifeanyi",
        last_name: "Lucky",
        age: 23,
        class: "JSS2",
        admission_no: 1922383,
      },
      {
        first_name: "Chika",
        last_name: "Oluwaseun",
        age: 24,
        class: "JSS3",
        admission_no: 2911929,
      },
    ];

    const result = htmlToPdf(students[0]);
    return result;
  }

  // routes() {
  //   this.router.get("/", (_req, res) => res.send(this.getStudentsRoute()));
  //   this.router.get("/report-card", (req, res) => {
  //     res.send(this.getStudentReport());
  //   });
  //   return this.router;
  // }
}
