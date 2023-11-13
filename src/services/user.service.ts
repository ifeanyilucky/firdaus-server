import { BadRequestError, NotFoundError } from "../error";
import { User } from "../models/user.model";
import { IUser, IUserResponse } from "../interface/user.interface";
import { cloudUpload } from "../utils/cloudinary";
import { File } from "buffer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import ejs from "ejs";
import path from "path";
import { sendEmail } from "../utils/sendemail";
import { assignSubject } from "../utils/assignSubject";
import {
  BasicSubjects,
  ElementarySubjects,
  ScienceSubjects,
} from "../config/subjects";

export const UserService = {
  getUser: async (id: string) => {
    return await User.findOne({ _id: id })
      .populate("reports")
      .select("-password");
  },
  deleteUser: async (id: string) => {
    return await User.findOneAndDelete({ _id: id });
  },
  createUser: async (data: IUser, file: Express.Multer.File | any) => {
    let teacherSignature = "";
    let studentSubject: any = [];
    if (data.role === "student") {
      if (!data.admissionNumber) {
        throw new BadRequestError("Please enter admission number");
      } else {
        const existingStudent = await User.findOne({
          admissionNumber: data.admissionNumber,
        });
        if (existingStudent)
          throw new BadRequestError(
            "Student with this admission number already exists"
          );
      }
      const getAssignedSubject = assignSubject(
        data.currentClass,
        data.department
      );
      studentSubject = getAssignedSubject?.subject;
    }
    if (data.role === "teacher") {
      if (!data?.teacherId) {
        throw new BadRequestError("Please enter teacher ID");
      } else {
        const existingTeacher = await User.findOne({
          teacherId: data.teacherId,
        });
        if (existingTeacher) {
          throw new BadRequestError("Teacher with this ID already exists");
        }
      }

      // if (!file.path)
      //   throw new BadRequestError("Teacher's signature is required");
      if (file?.path) {
        const upload = await cloudUpload(file?.path, "teacher-signature");
        teacherSignature = upload as string;
      }
    }

    const existingDepartment = ["art", "commercial", "science"].some(
      (item: string) => item === data.department
    );
    console.log(data);
    return await User.create({
      ...data,
      teacherSignature: teacherSignature,
      department: existingDepartment ? data.department : "none",
      subjects: studentSubject,
    });
  },
  updateUser: async (
    id: string,
    params: { data: IUser; user: IUser; file: Express.Multer.File | any }
  ) => {
    const { data } = params;

    let teacherSignature = params.user.teacherSignature;
    if (params.file?.path) {
      const uploadSignature = await cloudUpload(
        params.file.path,
        "teacher-signature"
      );
      teacherSignature = uploadSignature as string;
    }
    return await User.findOneAndUpdate(
      { _id: id },
      { ...data, teacherSignature },
      { new: true }
    );
  },
  getUsers: async (params: {
    query: IUserResponse | any;
    page: number;
    limit: number;
  }) => {
    const {
      role,
      _id,
      department,
      classHandled,
      currentClass,
      classTeacher,
      firstName,
      lastName,
    } = params.query;
    const queryObject: IUserResponse | any = {};

    if (role) {
      queryObject.role = role;
    }
    if (firstName) {
      queryObject.firstName = { $regex: firstName, $options: "i" };
    }
    if (lastName) {
      queryObject.lastName = { $regex: lastName, $options: "i" };
    }
    if (_id) {
      queryObject._id = _id;
    }
    if (classTeacher) {
      queryObject.classTeacher = classTeacher;
    }
    if (department) {
      queryObject.department = department;
    }
    if (classHandled) {
      queryObject.classHandled = classHandled;
    }
    if (currentClass) {
      queryObject.currentClass = currentClass;
    }
    let result = User.find(queryObject);
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 5;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const users = await result;
    const totalDocuments = await User.countDocuments(queryObject);
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
      list: users,
      total: totalDocuments,
      currentPage: page,
      limit,
      totalPages,
    };
  },

  multiUsers: async (data: IUser[]) => {
    const allUsers = User.insertMany(data);
    return allUsers;
  },

  forgotPassword: async (params: { email: string }) => {
    const { email } = params;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new NotFoundError(`${email} not found!`);
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.HOST}/reset-password/${resetToken}`;

    ejs.renderFile(
      path.join(__dirname, "../views/emails/reset-password.ejs"),
      { email: user.email, resetUrl },
      async (error, data) => {
        if (error) {
          console.log(error);
          user.passwordResetToken = undefined as unknown as string;
          user.passwordResetExpire = undefined as unknown as Date;

          await user.save();
          throw new BadRequestError("Email could not be sent");
        } else {
          await sendEmail({
            to: user.email,
            subject: "Forgot your password? Let's get you a new one.",
            html: data,
          });
        }
      }
    );
  },
  changePassword: async (params: {
    oldPassword: string;
    newPassword: string;
    user: IUserResponse;
  }) => {
    const { oldPassword, newPassword } = params;

    const account = await User.findOne({ _id: params.user._id });

    if (!account) throw new NotFoundError("User not found");
    const isPasswordRight = await account.comparePassword(oldPassword);

    if (!isPasswordRight)
      throw new BadRequestError(`Sorry that password isn't right`);
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);
    const updatePassword = await User.findOneAndUpdate(
      { _id: account._id },
      { password: hashNewPassword },
      { new: true }
    );
    return updatePassword;
  },

  resetPassword: async (params: { token: string; password: string }) => {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      passwordResetExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw new BadRequestError("Invalid reset token");
    }

    user.password = params.password;
    user.passwordResetToken = undefined as unknown as string;
    user.passwordResetExpire = undefined as unknown as Date;

    await user.save();
  },
  removeSubject: async (params: { subjectCode: string; userId: string }) => {
    const { subjectCode, userId } = params;
    let updatedSubjects = null;
    if (BasicSubjects.filter((item) => item.code === subjectCode)) {
      const newSubjects = BasicSubjects.filter(
        (item) => item.code !== subjectCode
      );

      updatedSubjects = await User.findOneAndUpdate(
        { _id: userId },
        { subjects: newSubjects }
      );
    }
    if (ElementarySubjects.filter((item) => item.code === subjectCode)) {
      const newSubjects = ElementarySubjects.filter(
        (item) => item.code !== subjectCode
      );

      updatedSubjects = await User.findOneAndUpdate(
        { _id: userId },
        { subjects: newSubjects }
      );
    }
    if (ScienceSubjects.filter((item) => item.code === subjectCode)) {
      const newSubjects = ScienceSubjects.filter(
        (item) => item.code !== subjectCode
      );

      updatedSubjects = await User.findOneAndUpdate(
        { _id: userId },
        { subjects: newSubjects }
      );
    }
    return updatedSubjects;
  },
};
