import { ObjectId } from "mongoose";
import { IReport } from "./report.interface";

export interface IUser {
  firstName: string;
  lastName: string;
  middleName?: string;
  teacherId?: string;
  email: string;
  role?: string;
  avatar?: string;
  password: string;
  admissionNumber?: string;
  department?: string;
  currentClass: "JSS1" | "JSS2" | "JSS3" | "SSS1" | "SSS2" | "SSS3";
  reports?: IReport[];
  gender: string;
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
export interface IUserResponse extends IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}