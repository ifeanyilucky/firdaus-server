import * as Mongoose from "mongoose";
import { CLASS } from "../interface/user.interface";
import { IReport } from "../interface/report.interface";

type ReportModel = Mongoose.Model<IReport, {}, {}>;

export const ReportSchema = new Mongoose.Schema<IReport>({
  teacher: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please assign class teacher to this report"],
  },
  performance: [],
  attendance: {
    type: Object,
  },
  personalTrait: {
    type: Object,
  },
  classTeacherComment: {
    type: String,
  },

  status: {
    type: String,
    enum: ["PUBLISHED", "DRAFT"],
    default: "DRAFT",
  },
  student: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  reportTerm: {
    type: String,
    required: [true, "Please enter term of student report"],
    enum: ["FIRST_TERM", "SECOND_TERM", "THIRD_TERM"],
  },
  reportClass: {
    type: String,
    enum: ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"],
    required: [true, "Please specify student class"],
  },
  classSection: {
    type: String,
    enum: ["junior", "senior"],
    required: [true, "Class section is required"],
  },
});

export const Report = Mongoose.model<IReport, ReportModel>(
  "Report",
  ReportSchema
);
