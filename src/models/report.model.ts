import * as Mongoose from "mongoose";
import { CLASS } from "../interface/user.interface";
import { IReport } from "../interface/report.interface";

type ReportModel = Mongoose.Model<IReport, {}, {}>;

export const ReportSchema = new Mongoose.Schema<IReport>({
  teacher: String,
  subjects: [],
  status: {
    type: String,
    enum: ["PUBLISHED", "DRAFT"],
  },
  studentId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  term: {
    type: String,
    required: [true, "Please enter term of student report"],
    enum: ["FIRST_TERM", "SECOND_TERM", "THIRD_TERM"],
  },
  class: {
    type: String,
    enum: ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"],
    required: [true, "Please specify student class"],
  },
});

export const Report = Mongoose.model<IReport, ReportModel>(
  "Report",
  ReportSchema
);
