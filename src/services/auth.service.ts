import { BadRequestError, NotFoundError } from "../error";
import { User } from "../models/user.model";
import { IUser } from "../interface/user.interface";

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
    return { data: user, token };
  },

  // Login service
  login: async (params: {
    loginData: ILoginData;
  }): Promise<{ data: IUser; token: string }> => {
    const {
      loginData: { admissionNumber, password },
    } = params;

    if (!admissionNumber && !password)
      throw new BadRequestError("Please provide admission number and password");

    const user = await User.findOne({
      admissionNumber: admissionNumber,
    });

    if (!user)
      throw new NotFoundError(
        "Cannot find student with this admission number!"
      );

    const passwordIsCorrect = await user.comparePassword(password);
    if (!passwordIsCorrect)
      throw new BadRequestError("Sorry, that password isn't right");

    const token = user.createJwt();
    return { data: user, token };
  },
  account: async (params: { id: string }) => {
    const { id } = params;
    const user = await User.findOne({ _id: id });
    if (!user) throw new NotFoundError("User with this ID does not exist");

    return user;
  },
};
