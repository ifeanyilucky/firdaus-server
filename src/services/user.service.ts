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
  ArtsSubjects,
  BasicSubjects,
  CommercialSubjects,
  ElementarySubjects,
  JuniorSubjects,
  ScienceSubjects,
} from "../config/subjects";
import { Subject } from "../models/subject.model";
import { ISubject } from "../interface/subject.interface";

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
    let subjects: ISubject[] = [];
    let teacherSignature = "";
    let studentSubject: any = [];
    let classTeacher: any;
    // ASSIGN SUBJECTS TO TEACHER AND STUDENT
    if (data.role === "student" || data.role === "teacher") {
      if (["FGNSC_001", "FGNSC_002", "FGKGC_002"].includes(data.currentClass)) {
        subjects = ElementarySubjects;
      }
      if (
        [
          "FGBSC_001",
          "FGBSC_002",
          "FGBSC_003",
          "FGBSC_004",
          "FGBSC_005",
          "FGBSC_006",
        ].includes(data.currentClass)
      ) {
        subjects = BasicSubjects;
      }
      if (["FGJSC_001", "FGJSC_002", "FGJSC_003"].includes(data.currentClass)) {
        subjects = JuniorSubjects;
      }
      if (["FGSSC_001", "FGSSC_002", "FGSSC_003"].includes(data.currentClass)) {
        if (data.department === "science") {
          subjects = ScienceSubjects;
        }
        if (data.department === "art") {
          subjects = ArtsSubjects;
        }
        if (data.department === "commercial") {
          subjects === CommercialSubjects;
        }
      }
    }
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

    console.log(subjects);
    const user = await User.create({
      ...data,
      teacherSignature: teacherSignature,
      department: existingDepartment ? data.department : "none",
      subjects: studentSubject,
    });

    await Subject.create({
      subjects: subjects,
      user_id: user._id,
    });

    return user;
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
      status,
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
    if (status) {
      queryObject.status = status;
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
  adminChangeStudentPassword: async (params: {
    newPassword: string;
    userId: string;
  }) => {
    const { newPassword } = params;
    const account = await User.findOne({ _id: params.userId });
    if (!account) throw new NotFoundError("User not found");
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);
    const updatePassword = await User.findOneAndUpdate(
      { _id: account._id },
      { password: hashNewPassword },
      { new: true }
    );
    return updatePassword;
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

    if (!isPasswordRight) throw new BadRequestError(`Password is incorrect`);
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
