export interface Student {
  first_name: string;
  last_name: string;
  age: number;
  class: string;
  admission_no: number;
  gender?: "male" | "female";
}
export interface Teacher extends Student {}
