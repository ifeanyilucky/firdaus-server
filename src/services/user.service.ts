import { BadRequestError } from "../error";
import { User } from "../models/user.model";
import { IUser, IUserResponse } from "../interface/user.interface";

export const UserService = {
  getUser: async (id: string) => {
    return await User.findOne({ _id: id })
      .populate("reports")
      .select("-password");
  },
  deleteUser: async (id: string) => {
    return await User.findOneAndDelete({ _id: id });
  },
  createUser: async (data: IUser) => {
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
    }

    return await User.create(data);
  },
  updateUser: async (id: string, data: IUser) => {
    return await User.findOneAndUpdate({ _id: id }, { ...data }, { new: true });
  },
  getUsers: async (params: { query: IUserResponse | any }) => {
    const { role, teacherId, _id, department, classHandled, currentClass } =
      params.query;
    const queryObject: IUserResponse | any = {};

    if (teacherId) {
      queryObject.teacherId = teacherId;
    }
    if (role) {
      queryObject.role = role;
    }
    if (_id) {
      queryObject._id = _id;
    }
    if (teacherId) {
      queryObject.teacherId = teacherId;
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
