import { IReport, Term } from "../interface/report.interface";
import { Report } from "../models/report.model";
import { Term as TermModel } from "../models/term.model";
import { generatePdf } from "../utils/html-to-pdf";
import ejs from "ejs";
import path from "path";
import { CLASS, IUser, IUserResponse } from "../interface/user.interface";
import { User } from "../models/user.model";
import { BadRequestError, NotFoundError } from "../error";
import { JUNIOR_SECTION, ROLES, SENIOR_SECTION } from "../config/app";
import mongoose from "mongoose";
import { juniorReportConfig, seniorReportConfig } from "../config/ejs-config";

const { ObjectId } = mongoose.Schema;
export const ReportService = {
  findReport: async function (params: { id: string }) {
    const { id } = params;
    return await Report.findOne({ id });
  },

  allReports: async function (query: IReport) {
    const { student, reportTerm, reportClass, status, teacher }: IReport =
      query;

    const queryObject: IReport | any = {};

    if (student) {
      queryObject.student = new mongoose.Types.ObjectId(student as string);
    }
    if (reportTerm) {
      queryObject.reportTerm = reportTerm;
    }

    if (reportClass) {
      queryObject.reportClass = reportClass;
    }
    if (status) {
      queryObject.status = status;
    }
    if (teacher) {
      queryObject.teacher = new mongoose.Types.ObjectId(teacher as string);
    }
    return await Report.find(queryObject);
  },

  deleteReport: async function (params: { id: string }) {
    const { id } = params;
    return await Report.findOneAndDelete({ id });
  },

  updateReport: async function (params: { id: string; data: IReport }) {
    const { id, data } = params;

    const updatedReport = await Report.findOneAndUpdate(
      { id },
      { ...data },
      { new: true }
    );
    return updatedReport;
  },

  createReport: async function (params: { data: IReport; teacherId: string }) {
    const { data, teacherId } = params;

    const existingReport = await Report.findOne({
      student: data.student,
      reportTerm: data.reportTerm,
      classSection: data.classSection,
      reportClass: data.reportClass,
    });
    if (existingReport)
      throw new BadRequestError(`Report already exists for this student.`);

    const currentDate = new Date();
    const currentTerm = await TermModel.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    const newReport = new Report({
      ...data,
      teacher: teacherId,
      // reportTerm: currentTerm?.name,
      // reportYear: currentTerm?.startDate,
    });
    return await newReport.save();
  },
  // GET AND CONVERT REPORT TO PDF AND SEND THE FILE PATH TO CONTROLLER
  downloadReport: async function (params: {
    student: string;
    selectedTerm: string;
    selectedClass: string;
    reportId: string;
    user: IUserResponse;
    classSection: string;
  }) {
    const {
      student,
      selectedTerm,
      selectedClass,
      reportId,
      user,
      classSection,
    } = params;
    console.log(selectedTerm);
    const report = await Report.findOne({
      reportTerm: selectedTerm,
      reportClass: selectedClass,
      student: user._id,
      classSection: classSection,
    })
      .populate("student")
      .populate("teacher");

    console.log(report);
    if (!report) {
      throw new NotFoundError("You do not have a report for this session");
    }
    const {
      personalSkills,
      affectiveDomain,
      personalTrait,
      publishDate,
      conduct,
      sports,
      attendance,
      student: std,
    } = report;
    let htmlReport: string = "";
    if (report.classSection === "junior") {
      ejs.renderFile(
        path.join(__dirname, "../views/junior-report.ejs"),
        {
          report: juniorReportConfig(report).report,
        },
        // @ts-ignore
        (err: Error, html: string): any => {
          if (err) {
            console.log(err);
          }
          htmlReport = html;
        }
      );
    } else {
      ejs.renderFile(
        path.join(__dirname, "../views/senior-report.ejs"),
        {
          report: seniorReportConfig(report).report,
        },
        // @ts-ignore
        (err: Error, html: string): any => {
          if (err) {
            console.log(err);
          }
          htmlReport = html;
        }
      );
    }

    const reportPath = path.join(__dirname, "../tmp/report-sheet.pdf");
    // convert html to pdf
    await generatePdf(htmlReport, reportPath)
      .then((res) => {
        console.log("Pdf created successfully");
        console.log(res);
      })
      .catch((error: any) => {
        console.log("Error generating PDF", error);
      });
    return reportPath;
  },
};
