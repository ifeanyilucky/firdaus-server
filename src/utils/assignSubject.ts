import {
  sssOne,
  sssThree,
  sssTwo,
  jssOne,
  jssThree,
  jssTwo,
  pryFive,
  pryFour,
  pryOne,
  prySix,
  pryThree,
  pryTwo,
  kgOne,
  kgTwo,
} from "../config/class_code";
import {
  ArtsSubjects,
  BasicSubjects,
  CommercialSubjects,
  ElementarySubjects,
  JuniorSubjects,
  ScienceSubjects,
} from "../config/subjects";

export const assignSubject = (
  classCode: string,
  department?: string
): {
  subject: {
    name: string;
    code: string;
    id: string;
  }[];
  department?: string;
} | null => {
  if ([kgOne, kgTwo].includes(classCode)) {
    return {
      subject: ElementarySubjects,
    };
  }
  if (
    [pryOne, pryTwo, pryThree, pryFour, pryFive, prySix].includes(classCode)
  ) {
    return {
      subject: BasicSubjects,
    };
  }
  if ([jssOne, jssTwo, jssThree].includes(classCode)) {
    return {
      subject: JuniorSubjects,
    };
  }
  if ([sssOne, sssTwo, sssThree].includes(classCode)) {
    if (department === "science") {
      return {
        subject: ScienceSubjects,
        department: department,
      };
    }
    if (department === "commercial") {
      return {
        subject: CommercialSubjects,
        department: department,
      };
    }
    if (department === "art") {
      return {
        subject: ArtsSubjects,
        department: department,
      };
    }
  }
  return null;
};
