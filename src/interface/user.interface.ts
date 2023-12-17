import { ObjectId } from "mongoose";
import { IReport } from "./report.interface";

export interface IUser {
  firstName: string;
  lastName: string;
  middleName?: string;
  teacherId?: string;
  status: string;
  email: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
  password: string;
  admissionNumber?: string;
  currentClass:
    | "FGKGC_001"
    | "FGKGC_002"
    | "FGNSC_001"
    | "FGNSC_002"
    | "FGBSC_001"
    | "FGBSC_002"
    | "FGBSC_003"
    | "FGBSC_004"
    | "FGBSC_005"
    | "FGBSC_006"
    | "FGJSC_001"
    | "FGJSC_002"
    | "FGJSC_002"
    | "FGJSC_003"
    | "FGSSC_001"
    | "FGSSC_002"
    | "FGSSC_003";
  reports?: IReport[];
  gender: string;
  subjects?: object[];
  tel?: string;
  passwordResetExpire: Date;
  passwordResetToken: string;
  parentPhone?: string;
  teacherSignature?: string;
  subjectTaught?: string;
  classHandled?: "JSS1" | "JSS2" | "JSS3" | "SSS1" | "SSS2" | "SSS3" | string;
  classTeacher?: string;
  teacherType: string;
  department?: "science" | "commercial" | "art";
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
