import { Container, Inject } from "typedi";
import { StudentRepository } from "../repositories/StudentRepository";

export default class StudentService {
  // @Inject()
  studentRepo: StudentRepository;

  constructor(@Inject() studentRepo: StudentRepository) {
    this.studentRepo = studentRepo;
  }

  // studentRepo = Container.get(StudentRepository);
  getStudents() {
    return this.studentRepo.getStudents();
  }

  getStudentReport() {
    return this.studentRepo.getStudentReportCard();
  }
}
