import * as Mongoose from "mongoose";
import { CLASS, IUser } from "./user.interface";

export enum ReportStatus {
  PUBLISHED,
  DRAFT,
}
export enum Term {
  FIRST_TERM,
  SECOND_TERM,
  THIRD_TERM,
}

export interface IReport extends JuniorReport {
  teacher: IUser | string;
  admissionNumber: string;
  timesSchoolOpenedAndActivities: string;
  schoolReopenDate: string;
  timesPunctual: string;
  // classSection: string;
  reportYear: string;
  // subjects : Subject[],
  status: string;
  _id?: string;
  student?: IUser | string;
  publishDate: Date;
  affectiveDomain: {
    punctuality?: string;
    politeness?: string;
    attentiveness?: string;
    neatness?: string;
    initiative?: string;
    perseverance?: string;
    teamWork?: string;
    leadershipSpirit?: string;
    relationshipWithTeachers?: string;
    attitudeToWork?: string;
    health?: string;
    emotionalStability?: string;
    innovative?: string;
  };
  personalSkills: {
    literary: string;
    technical: string;
    innovative: string;
    sporting: string;
    quranMemorization: string;
    hadithSkill: string;
    arabiyyaAndFiqhu: string;
    cultural: string;
  };
  reportTerm: "FIRST TERM" | "SECOND TERM" | "THIRD TERM";
  performance: subject[];
  reportClass: "JSS1" | "JSS2" | "JSS3" | "SSS1" | "SSS2" | "SSS3";
  classSection: string;
  classTeacherComment: string;
  attendance: ISeniorAttendance | IJuniorAttendance;
  personalTrait?: {
    punctuality?: string;
    neatness?: string;
    leadership?: string;
    trait?: string;
    demeanor?: string;
    honesty?: string;
    respect?: string;
    mixing?: string;
    obedience?: string;
    teamWork?: string;
  };
}
export interface subject extends juniorSubject {
  subject: string;
  continuousAssessmentScore: number;
  examScore: number;
  totalWeightedAverage: number;
  positionGrade: string;
  comment?: string;
}

export interface juniorSubject {
  subject: string;
  sumTestScores: string;
}

export interface JuniorReport {
  conduct: {
    comments: string;
  };
  physicalHealth: {
    height: {
      beginningOfTerm: string;
      endOfTerm: string;
    };
    weight: {
      beginningOfTerm: string;
      endOfTerm: string;
    };
    daysAbsentDueToIllness: string;
    cleanlinessRating: string;
    remarks: string;
    natureOfIllness: string;
  };
  position: string;
  sports: {
    ballGames: string;
    track: string;
    throws: string;
    swimming: string;
    jumps: string;
  };
  clubs: {
    organization: string;
    officeHeld: string;
    significantContribution: string;
  };
  classTeacherSignature?: string;
  principalComment: string;
  classTeacherComment: string;
  schoolReopens: string;
  numberOfStudents: string;
}

export interface ISeniorAttendance {
  timesSchoolOpened: number;
  timePresent: number;
  timeAbsent: number;
}

export interface IJuniorAttendance {
  school: {
    timesSchoolOpenedAndActivities: string;
    timesPresent: string;
    timesAbsent: string;
    timesPunctual: string;
  };
  sportAndAthletics: {
    timesSchoolOpenedAndActivities: string;
    timesPresent: string;
    timesAbsent: string;
    timesPunctual: string;
  };
  otherOrganizedActivities: {
    timesSchoolOpenedAndActivities: string;
    timesPresent: string;
    timesAbsent: string;
    timesPunctual: string;
  };
}
