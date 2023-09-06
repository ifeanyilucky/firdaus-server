import { ObjectId } from "mongoose";
import { IReport } from "./report.interface";

export interface IUser {
  firstName: string;
  lastName: string;
  middleName?: string;
  teacherId?: string;
  email: string;
  avatar?: string;
  password: string;
  admissionNumber?: string;
  department?: string;
  class: CLASS;
  reports?: IReport[];
  role: string;
  tel?: string;
  passwordResetExpire: Date;
  passwordResetToken: string;
}

export enum CLASS {
  JSS1,
  JSS2,
  JSS3,
  SSS1,
  SSS2,
  SSS3,
}
export interface IUserResponse {
  firstName: string;
  lastName: string;
  middleName: string;
  admissionNumber: string;
  email: string;
  class: string;
  department: string;
  password: string;
  role: string;
  reports: [];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
