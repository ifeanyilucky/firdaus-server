import { BadRequestError } from "../error";
import { User, IUser } from "../models/user.model";

export const UserService = {
  getUser: async (id: string) => {
    return await User.findOne({ id }).populate("-password");
  },
  deleteUser: async (id: string) => {
    return await User.findOneAndDelete({ id });
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
    return await User.findOneAndUpdate({ id }, { ...data }, { new: true });
  },
  getUsers: async () => {
    return await User.find({});
  },
};
