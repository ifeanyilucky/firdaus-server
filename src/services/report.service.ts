import axios from "axios";
import { IReport, Term } from "../interface/report.interface";
import { Report } from "../models/report.model";
import { Term as TermModel } from "../models/term.model";
import ejs from "ejs";
import path from "path";
import { CLASS, IUser, IUserResponse } from "../interface/user.interface";
import { User } from "../models/user.model";
import { BadRequestError, NotFoundError } from "../error";
import mongoose from "mongoose";
import { JUNIOR_SECTION, ROLES, SENIOR_SECTION } from "../config/app";
import { juniorReportConfig, seniorReportConfig } from "../config/ejs-config";
import { Response } from "express";
import fs from "fs";

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

    return await Report.find(queryObject)
      .populate("teacher")
      .populate("student");
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

  createReport: async function (params: {
    data: IReport;
    teacherId: string;
    reportClass: string;
  }) {
    const { data, teacherId } = params;
    console.log(JSON.stringify(params.data));

    const existingReport = await Report.findOne({
      student: data.student,
      reportTerm: data.reportTerm,
      reportClass: params.reportClass,
    });
    if (existingReport)
      throw new BadRequestError(`Report already exists for this student.`);
    const student = await User.findOne({
      admissionNumber: data.admissionNumber,
    });
    const currentDate = new Date();
    const currentTerm = await TermModel.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    const newReport = await Report.create({
      ...data,
      student: student?._id,
      teacher: teacherId,
      reportTerm: currentTerm?.name,
      reportYear: currentTerm?.startDate,
      reportClass: params.reportClass,
    });
    return newReport;
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
    console.log("selected term", selectedTerm);
    console.log("selected class", selectedClass);
    console.log("class section", classSection);
    console.log("student", student);

    const report = await Report.findOne({
      reportTerm: selectedTerm,
      reportClass: selectedClass,
      student: student,
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
    if (report.classSection == "junior") {
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
    }
    if (report.classSection == "senior") {
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
    if (report.classSection == "primary") {
      return null;
    } else if (report.classSection == "elementary") {
      return null;
    }
    const reportPath = path.join(__dirname, "../tmp/report-sheet.pdf");

    // const pdfReport = await axios.post("http://localhost:8080/to-pdf", {
    //   html: htmlReport,
    // });

    // fs.writeFile(reportPath, pdfReport.data, (err) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }

    //   console.log("PDF received and saved on Server");
    // });

    // convert html to pdf
    // await convertToPdf(htmlReport, reportPath)
    //   .then(() => {
    //     console.log("Pdf created successfully");
    //   })
    //   .catch((error) => {
    //     console.log("Error generating PDF", error);
    //   });
    return htmlReport;
  },

  getReportsByTeacher: async function (params: { teacherId: string }) {
    const reports = await Report.find({});

    return reports;
  },
};

// https://generate-pdf-emhz.onrender.com/
