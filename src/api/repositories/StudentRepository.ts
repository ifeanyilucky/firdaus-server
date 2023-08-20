import { Service } from "typedi";

// @Service()
export class StudentRepository {
  // public async createUser(data: object){
  //     let entity = new User()
  //     Object.assign(entity, data);

  //     return await this.save(entity)
  // }
  students = [
    {
      first_name: "Oluwaferanmi",
      last_name: "Emmanuel",
      age: "20",
      class: "JSS1",
    },
    { first_name: "Ifeanyi", last_name: "Lucky", age: "23", class: "JSS2" },
    { first_name: "Chika", last_name: "Oluwaseun", age: "24", class: "JSS3" },
  ];

  public getStudents() {
    return this.students;
  }
}
