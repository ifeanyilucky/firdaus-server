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
    if (data.role === "student") {
      if (!data.admissionNumber) {
        throw new BadRequestError("Please enter admission number");
      } else {
        const existingStudent = await User.findOne({
          admissionNumber: data.admissionNumber,
        });
        if (existingStudent)
          throw new BadRequestError(
            "Student with this admission number already existed"
          );
      }
    }
    if (data.role === "teacher") {
      if (!data.teacherId) {
        throw new BadRequestError("Please enter teacher ID");
      } else {
        const existingTeacher = await User.findOne({
          teacherId: data.teacherId,
        });
        if (existingTeacher) {
          throw new BadRequestError("Teacher with this ID already existed");
        }
      }
      if (!file.path)
        throw new BadRequestError("Teacher's signature is required");

      const upload = await cloudUpload(file.path, "teacher-signature");
      teacherSignature = upload as string;
    }

    const existingDepartment = ["art", "commercial", "science"].some(
      (item: string) => item === data.department
    );

    return await User.create({
      ...data,
      teacherSignature,
      department: existingDepartment ? data.department : "none",
    });
  },
  updateUser: async (id: string, data: IUser) => {
    return await User.findOneAndUpdate({ _id: id }, { ...data }, { new: true });
  },
  getUsers: async (params: { query: IUserResponse | any }) => {
    const { role, _id, department, classHandled, currentClass, classTeacher } =
      params.query;
    const queryObject: IUserResponse | any = {};

    if (role) {
      queryObject.role = role;
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
    return await User.find(queryObject);
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
};
