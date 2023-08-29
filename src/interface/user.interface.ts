export interface IUser {
  firstName: string;
  lastName: string;
  middleName?: string;
  class: string;
  email: string;
  department?: string;
  password: string;
  id: string;
  admissionNumber: number;
  createdOn: Date;
}
