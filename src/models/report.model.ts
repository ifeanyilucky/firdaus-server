import * as Mongoose from "mongoose";
import { CLASS } from "../interface/user.interface";
import { IReport } from "../interface/report.interface";

type ReportModel = Mongoose.Model<IReport, {}, {}>;

export const ReportSchema = new Mongoose.Schema<IReport>(
  {
    performance: [],
    timesSchoolOpenedAndActivities: String,
    timesPunctual: String,
    schoolReopenDate: String,
    attendance: {
      type: Object,
    },
    sports: Object,
    clubs: Object,
    position: String,
    physicalHealth: Object,
    schoolReopens: String,
    numberOfStudents: String,
    conduct: Object,
    teacher: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please assign class teacher to this report"],
    },
    personalTrait: {
      type: Object,
    },
    classTeacherComment: {
      type: String,
    },
    principalComment: String,

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
      enum: ["FIRST TERM", "SECOND TERM", "THIRD TERM"],
    },
    reportClass: {
      type: String,
      enum: [
        "FGKGC_001",
        "FGKGC_002",
        "FGNSC_001",
        "FGNSC_002",
        "FGBSC_001",
        "FGBSC_002",
        "FGBSC_003",
        "FGBSC_004",
        "FGBSC_005",
        "FGBSC_006",
        "FGJSC_001",
        "FGJSC_002",
        "FGJSC_002",
        "FGJSC_003",
        "FGSSC_001",
        "FGSSC_002",
        "FGSSC_003",
        "none",
      ],
      required: [true, "Please specify student class"],
    },
    classSection: {
      type: String,
      enum: ["junior", "senior", "elementary", "primary"],
      required: [true, "Class section is required"],
    },
    affectiveDomain: Object,
    personalSkills: Object,
    publishDate: Date,
    reportYear: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Report = Mongoose.model<IReport, ReportModel>(
  "Report",
  ReportSchema
);
