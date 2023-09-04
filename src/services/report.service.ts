import { Report, IReport } from "../models/report.model";

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
};
