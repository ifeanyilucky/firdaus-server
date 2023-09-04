import * as Mongoose from "mongoose";

enum ReportStatus {
  PUBLISHED,
  DRAFT,
}
enum Term {
  FIRST_TERM,
  SECOND_TERM,
  THIRD_TERM,
}
export interface IReport {
  teacherId: String;
  // subjects : Subject[],
  status: ReportStatus;
  studentId: String;
  term: Term;
}
export interface subject {
  subject: String;
  continuousAssessmentScore: Number;
  examScore: Number;
  totalWeightedAverage: Number;
  positionGrade: Number;
  comment: String;
}

export const Report = new Mongoose.Schema({
  teacher: String,
  subjects: [],
  status: {
    type: String,
    enum: ["PUBLISHED", "DRAFT"],
  },
  studentId: String,
  term: {
    type: String,
    enum: ["FIRST_TERM", "SECOND_TERM", "THIRD_TERM"],
  },
});
