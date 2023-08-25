import { Router, Response, Request } from "express";
import { Inject, Service } from "typedi";
import ejs from "ejs";
import path from "path";
import { JsonController, Controller, Get, Req, Res } from "routing-controllers";
import fs from "fs";
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
  async getStudentReport(@Req() req: Request, @Res() res: Response) {
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

    // htmlToPdf(students[0]);

    // const filePath: string = path.join(
    //   __dirname,
    //   "../../views/report-card.ejs"
    // );

    // let htmlContent: string = "";
    // ejs.renderFile(filePath, { user: students[2] }, (err, html) => {
    //   if (!err) {
    //     return (htmlContent = html);
    //   } else {
    //     return console.log(err);
    //   }
    // });

    // const pathToResult = path.join(__dirname, "../tmp/report-sheet.pdf");
    // fs.access(pathToResult, fs.constants.F_OK, (err) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return;
    //   }
    // });
    const pathToResult = path.join(__dirname, "../../tmp/report-sheet.pdf");
    console.log(pathToResult);

    res.download(pathToResult);
  }
}
