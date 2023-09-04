import { IUser, User } from "@base/models/user.model";

export const register = async (params: { data: IUser }): Promise<IUser> => {
  const { data } = params;
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error();

  const newUser = new User({ ...data });
  return await newUser.save();
};

// Login service
interface ILoginData {
  admissionNumber: number;
  password: string;
}
export const login = async (params: {
  loginData: ILoginData;
}): Promise<IUser> => {
  const { loginData } = params;
  const user = await User.findOne({
    admissionNumber: loginData.admissionNumber,
  });
};
