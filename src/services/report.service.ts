import { IReport, Term } from "../interface/report.interface";
import { Report } from "../models/report.model";
import { htmlToPdf } from "../utils/html-to-pdf";

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
    const newReport = new Report({
      ...params.data,
      teacher: params.teacherId,
    });
    return await newReport.save();
  },

  downloadReport: async function (params: {
    term: Term;
    studentId: string;
    class: string;
  }) {
    const { studentId, term } = params;
    const report = await Report.findOne({
      studentId,
      term,
      class: params.class,
    });
  },
};
