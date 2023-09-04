import { BadRequestError, NotFoundError } from "../error";
import { IUser, User } from "../models/user.model";

// Login service
interface ILoginData {
  admissionNumber: number;
  password: string;
}
// Register service
export const AuthService = {
  register: async (params: { data: IUser }) => {
    const { data } = params;
    const existingUser = await User.findOne({
      admissionNumber: data.admissionNumber,
    });
    if (existingUser)
      throw new BadRequestError(
        "User with this admission number already existed"
      );
    if (await User.findOne({ email: data.email }))
      throw new BadRequestError("User with this email already existed");

    const newUser = new User({ ...data });
    const user = await newUser.save();
    const token = user.createJwt();
    return { user, token };
  },

  login: async (params: {
    loginData: ILoginData;
  }): Promise<{ user: IUser; token: string }> => {
    const { loginData } = params;
    const user = await User.findOne({
      admissionNumber: loginData.admissionNumber,
    });

    if (!user)
      throw new NotFoundError(
        "Cannot find student with this admission number!"
      );

    const token = user.createJwt();
    return { user: user, token };
  },
};
