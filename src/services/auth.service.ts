import { BadRequestError, NotFoundError } from "../error";
import { IUserMethods, User } from "../models/user.model";
import { IUser, IUserResponse } from "../interface/user.interface";
import { ROLES } from "../config/app";
import { Document, Types } from "mongoose";
import { Subject } from "../models/subject.model";
import { assignSubject } from "../utils/assignSubject";
import {
  BasicSubjects,
  ArtsSubjects,
  CommercialSubjects,
  ElementarySubjects,
  JuniorSubjects,
  ScienceSubjects,
} from "../config/subjects";
import { ISubject } from "../interface/subject.interface";

interface ILoginData {
  admissionNumber: number;
  password: string;
  email: string;
  teacherId: string;
  role: string;
}

// Register service
export const AuthService = {
  register: async (params: { data: IUser }) => {
    const { data } = params;
    let subjects: ISubject[] = [];

    if (data.role === ROLES.TEACHER) {
      const existingTeacher = await User.findOne({
        teacherId: data.teacherId,
      });

      if (existingTeacher)
        throw new BadRequestError(
          "Teacher with this teacher id already existed"
        );
    }

    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail)
      throw new BadRequestError("User with this email already existed");

    const user = await User.create({ ...data });
    if (data.role === ROLES.STUDENT || data.role === ROLES.TEACHER) {
      if (["FGNSC_001", "FGNSC_002"].includes(data.currentClass)) {
        subjects = ElementarySubjects;
      }
      if (data.currentClass === "FGKGC_002") {
        subjects = BasicSubjects;
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

      console.log("subjects created successfully");
    }

    await Subject.create({
      subjects: subjects,
      user_id: user._id,
    });
    const token = user.createJwt();
    return { data: user, token };
  },

  // Login service
  login: async (params: {
    loginData: ILoginData;
  }): Promise<{ data: IUserResponse; token: string }> => {
    const {
      loginData: { admissionNumber, password, email, teacherId, role },
    } = params;
    let user:
      | (Document<unknown, {}, IUser> &
          Omit<
            IUser & {
              _id: Types.ObjectId;
            },
            keyof IUserMethods
          > &
          IUserMethods)
      | null = null;
    // if role is student
    if (role === ROLES.STUDENT) {
      if (!admissionNumber && !password)
        throw new BadRequestError(
          "Please provide admission number and password"
        );

      user = await User.findOne({
        admissionNumber: admissionNumber,
      });

      if (!user)
        throw new NotFoundError(
          "Cannot find student with this admission number!"
        );
    }

    // If role is teacher
    if (role === ROLES.TEACHER) {
      if (!teacherId && !password)
        throw new BadRequestError("Please provide teacher id and password");

      user = await User.findOne({ teacherId });

      if (!user)
        throw new NotFoundError("Cannot find teacher with this teacher id");
    }

    // if role is admin
    if (role === ROLES.ADMIN) {
      if (!email && password)
        throw new BadRequestError("Please provide email and password");

      user = await User.findOne({ email });
      if (!user) {
        throw new NotFoundError("Cannot find user with this email");
      }
    }

    const passwordIsCorrect = await user!.comparePassword(password);
    if (!passwordIsCorrect) throw new BadRequestError("Password is incorrect");

    const token = user!.createJwt();
    return { data: user as any, token };
  },
  account: async (params: { id: string }) => {
    const { id } = params;
    const user = await User.findOne({ _id: id });
    if (!user) throw new NotFoundError("User with this ID does not exist");

    return user;
  },
};
