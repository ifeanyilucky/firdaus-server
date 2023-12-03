import { Subject } from "../models/subject.model";
import { ISubject } from "../interface/subject.interface";
import mongoose from "mongoose";

export const SubjectService = () => {
  return {
    createSubject: (params: { userId: string }) => {},
    deleteSubject: async (params: {
      user_id: string;
      subject_code: string;
    }) => {
      const { subject_code, user_id } = params;

      const removeSubject = await Subject.updateOne(
        { user_id },
        { $pull: { subjects: { code: subject_code } } }
      );
      return removeSubject;
    },
    getSingleSubject: () => {},
    getAllSubjects: async (params: { user_id: mongoose.Types.ObjectId }) => {
      const subject = await Subject.findOne({
        user_id: params.user_id as mongoose.Types.ObjectId,
      });
      console.log("fetching subjects");
      console.log(subject);
      return subject;
    },
    addSubjects: async (params: { user_id: string; subjects: ISubject[] }) => {
      const subjects = await Subject.findOneAndUpdate({
        user_id: params.user_id,
        subjects: [...params.subjects],
      });
      return subjects;
    },
    updateSubjects: async (params: {
      subjects: ISubject[];
      user_id: string;
    }) => {
      const subjects = await Subject.findOneAndUpdate({
        user_id: params.user_id,
        subjects: [...params.subjects],
      });
      return subjects;
    },
  };
};
