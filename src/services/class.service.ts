import { BadRequestError } from "../error";
import { class_code } from "../config/class_code";
import { User } from "../models/user.model";
import { IUserResponse } from "../interface/user.interface";

export const ClassService = {
  moveToNextClass: async (params: {
    studentId: string;
    currentClass: string;
  }) => {
    const student = await User.findOne({ _id: params.studentId });

    const currentIndex = class_code.indexOf(
      (student as unknown as IUserResponse).currentClass
    );
    let response;
    if (currentIndex !== -1 && currentIndex < class_code.length - 1) {
      const nextClassCode = class_code[currentIndex + 1];
      console.log("next class code is", nextClassCode);
      response = await User.findOneAndUpdate(
        { _id: params.studentId },
        { currentClass: nextClassCode },
        { new: true }
      );
      // setClassCodes(prevClassCodes => [nextClassCode, ...prevClassCodes.slice(1)]);
    } else {
      // If already at the last class code, handle accordingly
      new BadRequestError("Student is already in the last class.");
    }

    return response;
  },
};
