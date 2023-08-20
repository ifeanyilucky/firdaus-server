import { Service, Inject } from "typedi";
import { htmlToPdf } from "../../utils/html-to-pdf";
import ejs from "ejs";
import path from "path";
import { Student } from "../../types/User";

// @Service()
export class StudentRepository {
  public async createUser(data: object) {
    // let entity = new User()
    // Object.assign(entity, data);
    // return await this.save(entity)
  }

  students: Student[] = [
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

  public getStudents() {
    return this.students;
  }

  public async getStudentReportCard() {
    const result = htmlToPdf(this.students[0]);
    return result;
  }
}
