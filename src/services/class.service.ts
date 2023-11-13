import { BadRequestError } from "../error";
import { class_code } from "../config/class_code";

export const ClassService = {
  moveToNextClass: (params: { studentId: string; currentClass: string }) => {
    console.log(params);
    const currentIndex = class_code.indexOf(params.currentClass);

    if (currentIndex !== -1 && currentIndex < class_code.length - 1) {
      const nextClassCode = class_code[currentIndex + 1];
      console.log("next class code is", nextClassCode);
      // setClassCodes(prevClassCodes => [nextClassCode, ...prevClassCodes.slice(1)]);
    } else {
      // If already at the last class code, handle accordingly
      new BadRequestError("Student is already in the last class.");
    }

    return "";
  },
};
