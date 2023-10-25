import { Admission } from "../models/admission.model";
import { nanoid, customAlphabet } from "nanoid";

export const AdmissionService = {
  getAdmissions: async (params: { _id: string }) => {
    const admissions = await Admission.find({});

    return admissions;
  },
  getSingleAdmission: async (params: { _id: string }) => {
    const admission = await Admission.findOne({ _id: params._id });

    return admission;
  },
  createAdmission: async (params: { data: object }) => {
    const id = `fgms${customAlphabet(
      "1234567890abcdefghijkmnopqrstuvwxyz",
      10
    )}`;
    const admission = await Admission.create({ ...params.data, id });

    return admission;
  },
};  
