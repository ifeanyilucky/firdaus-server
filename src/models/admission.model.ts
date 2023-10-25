import { IAdmission } from "../interface/admission.interface";
import mongoose from "mongoose";

export interface IAdmissionMethods {}

type AdmissionModel = mongoose.Model<IAdmission, {}, {}>;

const AdmissionSchema = new mongoose.Schema(
  {
    parentInformation: Object,
    studentInformation: Object,
    payment: Object,
    id: String,
  },
  { timestamps: true }
);

export const Admission = mongoose.model<IAdmission, AdmissionModel>(
  "Admission",
  AdmissionSchema
);
