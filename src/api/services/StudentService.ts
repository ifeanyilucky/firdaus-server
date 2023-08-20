import { Container, Inject } from "typedi";
import { StudentRepository } from "../repositories/StudentRepository";

export default class StudentService {
  // @Inject()
  studentRepo: StudentRepository;

  constructor(studentRepo: StudentRepository) {
    this.studentRepo = studentRepo;
  }

  getStudents() {
    // const studentRepo = Container.get(StudentRepository);
    return this.studentRepo.getStudents();
  }

  getStudentReport() {
    return this.studentRepo.getStudentReportCard();
  }
}
