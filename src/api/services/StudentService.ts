import { Container } from "typedi";
import { StudentRepository } from "../repositories/StudentRepository";

export default class StudentService {
  studentRepository: StudentRepository;
  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  getStudents() {
    const studentRepo = Container.get(StudentRepository);
    return studentRepo.getStudents();
  }
}
