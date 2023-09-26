import * as Mongoose from "mongoose";
import { CLASS } from "./user.interface";

export enum ReportStatus {
  PUBLISHED,
  DRAFT,
}
export enum Term {
  FIRST_TERM,
  SECOND_TERM,
  THIRD_TERM,
}

export interface IReport {
  teacher: string | object | Mongoose.ObjectId;
  // subjects : Subject[],
  status: string;
  _id?: string;
  student: string | object | Mongoose.ObjectId;
  reportTerm: "FIRST_TERM" | "SECOND_TERM" | "THIRD_TERM";
  performance: subject[];
  reportClass: "JSS1" | "JSS2" | "JSS3" | "SSS1" | "SSS2" | "SSS3";
  classSection: string;
  classTeacherComment: string;
  attendance: {
    timesSchoolOpened: number;
    timePresent: number;
    timeAbsent: number;
  };
  personalTrait?: {
    punctuality?: string;
    neatness?: string;
    leadership?: string;
    trait?: string;
    demeanor?: string;
    honesty?: string;
    respect?: string;
    mixing?: string;
    obedience?: string;
    teamWork?: string;
  };
}
export interface subject {
  subject: string;
  continuousAssessmentScore: number;
  examScore: number;
  totalWeightedAverage: number;
  positionGrade: string;
  comment: string;
}
