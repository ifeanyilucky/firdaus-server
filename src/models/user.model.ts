import crypto from "crypto";
import jwt, { Secret } from "jsonwebtoken";
import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import { appConfig } from "../config/app";
import { IReport } from "../interface/report.interface";
import { IUser } from "../interface/user.interface";

// ------------- Types----------------
export interface IUserMethods {
  createJwt: () => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  getResetPasswordToken: () => string;
}
type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

// -----------------------------------
const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      maxLength: 50,
    },
    middleName: {
      type: String,
      maxLength: 50,
    },
    admissionNumber: String,
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    avatar: {
      type: String,
    },
    currentClass: { type: String },
    department: String,
    teacherId: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "You must provide password"],
    },
    role: {
      type: String,
      enum: ["teacher", "student", "admin"],
      default: "student",
      required: [true, "Please specify role for this user"],
    },
    tel: {
      type: String,
      minLength: 10,
      maxLength: 11,
      trim: true,
      required: function (): boolean {
        return this.role === "teacher" ? true : false;
      },
    },
    parentPhone: {
      type: String,
      minLength: 10,
      maxLength: 11,
      trim: true,
      required: function (): boolean {
        return this.role === "student" ? true : false;
      },
    },
    teacherSignature: {
      type: String,
      required: function (): boolean {
        // @ts-ignore
        return this.role === "teacher" ? true : false;
      },
    },
    subjectTaught: {
      type: String,
      required: function (): boolean {
        // @ts-ignore
        return this.role === "teacher" ? true : false;
      },
    },
    classHandled: {
      type: String,
      enum: ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"],
      required: function (): boolean {
        // @ts-ignore
        return this.role === "teacher" ? true : false;
      },
    },
    passwordResetToken: String,
    passwordResetExpire: Date,
    reports: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Report" }],
    },
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJwt = function () {
  return jwt.sign(
    { userId: this._id, email: this.email, role: this.role },
    appConfig.jwtSecret as Secret,
    { expiresIn: appConfig.jwtLifetime }
  );
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpire = Date.now() + 10 * (1000 * 60);

  return resetToken;
};

export const User = mongoose.model<IUser, UserModel>("User", UserSchema);
