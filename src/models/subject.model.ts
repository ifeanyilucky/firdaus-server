import { ISubject } from "../interface/subject.interface";
import mongoose from "mongoose";

export interface ISubjectMethod {}

type SubjectModel = mongoose.Model<ISubject, {}, {}>;

const subject = new mongoose.Schema({
  name: String,
  code: String,
  id: String,
});

const SubjectsSchema = new mongoose.Schema(
  {
    subjects: [subject],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a student for this subject"],
    },
    department: String,
  },
  { timestamps: true }
);

export const Subject = mongoose.model<ISubject, SubjectModel>(
  "Subject",
  SubjectsSchema
);
