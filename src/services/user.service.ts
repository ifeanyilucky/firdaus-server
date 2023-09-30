import { BadRequestError } from "../error";
import { User } from "../models/user.model";
import { IUser, IUserResponse } from "../interface/user.interface";
import { cloudUpload } from "../utils/cloudinary";
import { File } from "buffer";

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

    return await User.create({ ...data, teacherSignature });
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
};
