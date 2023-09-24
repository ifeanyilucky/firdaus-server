import { IReport, Term } from "../interface/report.interface";
import { Report } from "../models/report.model";
import { htmlToPdf } from "../utils/html-to-pdf";
import ejs from "ejs";
import path from "path";
import { CLASS, IUser, IUserResponse } from "../interface/user.interface";
import { User } from "../models/user.model";
import { BadRequestError, NotFoundError } from "../error";
import { ROLES } from "../config/app";

export const ReportService = {
  findReport: async function (params: { id: string }) {
    const { id } = params;
    return await Report.findOne({ id });
  },

  allReports: async function () {
    return await Report.find({});
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
    // const newReport = new Report({
    //   ...params.data,
    //   teacher: params.teacherId,
    // });
    // return await newReport.save();
    console.log(JSON.stringify(params));
    return "nothing";
  },
  // GET AND CONVERT REPORT TO PDF AND SEND THE FILE PATH TO CONTROLLER
  downloadReport: async function (params: {
    studentId: string;
    selectedTerm: string;
    selectedClass: string;
    reportId: string;
    user: IUserResponse;
  }) {
    const { studentId, selectedTerm, selectedClass, reportId, user } = params;

    const report = await Report.findOne({
      reportTerm: selectedTerm,
      reportClass: selectedClass,
      student: user._id,
    })
      .populate("student")
      .populate("teacher");

    console.log(report);
    if (!report) {
      throw new NotFoundError("You do not have a report for this session");
    }

    let htmlReport: string = "";
    ejs.renderFile(
      path.join(__dirname, "../views/report-card.ejs"),
      { report },
      // @ts-ignore
      (err: Error, html: string): any => {
        if (err) {
          console.log(err);
        }
        htmlReport = html;
      }
    );

    const reportPath = path.join(__dirname, "../tmp/report-sheet.pdf");
    // convert html to pdf
    await htmlToPdf(htmlReport, reportPath)
      .then(() => {
        console.log("Pdf created successfully");
      })
      .catch((error) => {
        console.log("Error generating PDF", error);
      });
    return reportPath;
  },
};
