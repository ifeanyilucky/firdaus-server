import { User, IUser } from "../models/user.model";

export const UserService = {
  getUser: async (id: string) => {
    return await User.findOne({ id }).populate("-password");
  },
  deleteUser: async (id: string) => {
    return await User.findOneAndDelete({ id });
  },
  createUser: async (data: IUser) => {
    return await User.create(data);
  },
  updateUser: async (id: string, data: IUser) => {
    return await User.findOneAndUpdate({ id }, { ...data }, { new: true });
  },
  getUsers: async () => {
    return await User.find({});
  },
};
