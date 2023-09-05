import * as Mongoose from "mongoose";

interface ISchoolFee {
  status: string;
  transaction: object;
  payer: Mongoose.Schema.Types.ObjectId;
}

type SchoolFeeModel = Mongoose.Model<ISchoolFee, {}, {}>;

const SchoolFeeSchema = new Mongoose.Schema<ISchoolFee, SchoolFeeModel>({
  status: String,
  transaction: Object,
  payer: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provider user"],
  },
});

export const SchoolFee = Mongoose.model<ISchoolFee, SchoolFeeModel>(
  "SchoolFee",
  SchoolFeeSchema
);
