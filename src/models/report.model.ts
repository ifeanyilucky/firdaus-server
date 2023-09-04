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
  teacher: string;
  // subjects : Subject[],
  status: string;
  studentId: string;
  term: string;
  subjects: subject[];
}
export interface subject {
  subject: String;
  continuousAssessmentScore: Number;
  examScore: Number;
  totalWeightedAverage: Number;
  positionGrade: Number;
  comment: String;
}

type ReportModel = Mongoose.Model<IReport, {}, {}>;

export const ReportSchema = new Mongoose.Schema<IReport>({
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

export const Report = Mongoose.model<IReport, ReportModel>(
  "report",
  ReportSchema
);
