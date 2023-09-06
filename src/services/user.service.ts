import { BadRequestError } from "../error";
import { User } from "../models/user.model";
import { IUser } from "../interface/user.interface";

export const UserService = {
  getUser: async (id: string) => {
    return await User.findOne({ _id: id }).populate("-password");
  },
  deleteUser: async (id: string) => {
    return await User.findOneAndDelete({ _id: id });
  },
  createUser: async (data: IUser) => {
    if (data.role === "student") {
      if (!data.admissionNumber) {
        throw new BadRequestError("Please enter admission number");
      } else if (!data.teacherId) {
        throw new BadRequestError("Please enter teacher ID");
      }
    }
    return await User.create(data);
  },
  updateUser: async (id: string, data: IUser) => {
    return await User.findOneAndUpdate({ _id: id }, { ...data }, { new: true });
  },
  getUsers: async () => {
    return await User.find({});
  },
};
