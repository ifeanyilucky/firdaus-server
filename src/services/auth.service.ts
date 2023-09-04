import { IUser, User } from "@base/models/user.model";

export const register = async (params: { data: IUser }): Promise<IUser> => {
  const { data } = params;
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error();
};
