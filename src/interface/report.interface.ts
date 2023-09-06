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
  teacher: string;
  // subjects : Subject[],
  status: string;
  studentId: Mongoose.ObjectId;
  term: string;
  subjects: subject[];
  class: string | CLASS;
}
export interface subject {
  subject: String;
  continuousAssessmentScore: Number;
  examScore: Number;
  totalWeightedAverage: Number;
  positionGrade: Number;
  comment: String;
}
