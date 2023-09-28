import * as Mongoose from "mongoose";
import { CLASS } from "../interface/user.interface";

export interface ITerm {
  name: string;
  startDate: Date;
  endDate: Date;
}

type TermModel = Mongoose.Model<ITerm, {}, {}>;

export const TermSchema = new Mongoose.Schema<ITerm>(
  {
    name: {
      type: String,
      required: true,
      enum: ["FIRST TERM", "SECOND TERM", "THIRD TERM"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Term = Mongoose.model<ITerm, TermModel>("Term", TermSchema);
