import { IUser } from "../interface/user.interface";
import {
  IJuniorAttendance,
  IReport,
  ISeniorAttendance,
} from "../interface/report.interface";

export const seniorReportConfig = (report: IReport) => {
  return {
    report: {
      ...report,
      reportClass: report?.reportClass || "",
      performance: report?.performance || [],
      publishDate: report?.publishDate || "",
      reportTerm: report?.reportTerm || "",
      personalTrait: {
        punctuality: report?.personalTrait?.punctuality || "",
        neatness: report?.personalTrait?.neatness || "",
        leadership: report?.personalTrait?.leadership || "",
        trait: report?.personalTrait?.trait || "",
        demeanor: report?.personalTrait?.demeanor || "",
        respect: report?.personalTrait?.respect || "",
        honesty: report?.personalTrait?.honesty || "",
        mixing: report?.personalTrait?.mixing || "",
        obedience: report?.personalTrait?.obedience || "",
        teamWork: report?.personalTrait?.teamWork || "",
      },
      affectiveDomain: {
        punctuality: report?.affectiveDomain?.punctuality || "",
        politeness: report?.affectiveDomain?.politeness || "",
        attentiveness: report?.affectiveDomain?.attentiveness || "",
        neatness: report?.affectiveDomain?.neatness || "",
        initiative: report?.affectiveDomain?.initiative || "",
        perseverance: report?.affectiveDomain?.perseverance || "",
        teamWork: report?.affectiveDomain?.teamWork,
        leadershipSpirit: report?.affectiveDomain?.leadershipSpirit || "",
        relationshipWithTeachers:
          report?.affectiveDomain?.relationshipWithTeachers || "",
        attitudeToWork: report?.affectiveDomain?.attitudeToWork || "",
        health: report?.affectiveDomain?.health,
        emotionalStability: report?.affectiveDomain?.emotionalStability || "",
        innovative: report?.affectiveDomain?.innovative || "",
      },
      personalSkills: {
        literary: report?.personalSkills?.literary || "",
        technical: report?.personalSkills?.technical || "",
        innovative: report?.personalSkills?.innovative || "",
        sporting: report?.personalSkills?.sporting || "",
        quranMemorization: report?.personalSkills?.quranMemorization || "",
        hadithSkill: report?.personalSkills?.hadithSkill || "",
        arabiyyaAndFiqhu: report?.personalSkills?.arabiyyaAndFiqhu || "",
        cultural: report?.personalSkills?.cultural || "",
      },
      sports: {
        ballGames: report?.sports?.ballGames || "",
        track: report?.sports?.track || "",
        throws: report?.sports?.throws || "",
        swimming: report?.sports?.swimming || "",
        jumps: report?.sports?.jumps || "",
      },
      attendance: {
        timesSchoolOpened:
          (report?.attendance as ISeniorAttendance).timesSchoolOpened || "",
        timePresent:
          (report?.attendance as ISeniorAttendance).timePresent || "",
        timeAbsent: (report?.attendance as ISeniorAttendance).timeAbsent || "",
      },
      student: {
        admissionNumber: (report.student as IUser).admissionNumber,
        firstName: (report.student as IUser).firstName,
        lastName: (report.student as IUser).lastName,
        middleName: (report.student as IUser).middleName,
      },
    },
  };
};

export const juniorReportConfig = (report: IReport) => {
  return {
    report: {
      ...report,
      performance: report.performance || [],
      schoolReopens: report.schoolReopens,
      numberOfStudents: report.numberOfStudents,
      conduct: {
        comments: report.conduct.comments,
      },
      attendance: {
        school: {
          timesSchoolOpened: (report.attendance as IJuniorAttendance).school
            .timeAbsent,
          timeAbsent: (report.attendance as IJuniorAttendance).school
            .timeAbsent,
          timePunctual: (report.attendance as IJuniorAttendance).school
            .timesPunctual,
        },
        sportAndAthletics: {
          timesSchoolOpened: (report.attendance as IJuniorAttendance)
            .sportAndAthletics.timeAbsent,
          timeAbsent: (report.attendance as IJuniorAttendance).sportAndAthletics
            .timeAbsent,
          timePunctual: (report.attendance as IJuniorAttendance)
            .sportAndAthletics.timesPunctual,
        },
        otherOrganizedActivities: {
          timesSchoolOpened: (report.attendance as IJuniorAttendance)
            .sportAndAthletics.timeAbsent,
          timeAbsent: (report.attendance as IJuniorAttendance).sportAndAthletics
            .timeAbsent,
          timePunctual: (report.attendance as IJuniorAttendance)
            .sportAndAthletics.timesPunctual,
        },
      },
      physicalHealth: {
        height: {
          beginningOfTerm: report.physicalHealth.height.beginningOfTerm,
          endOfTerm: report.physicalHealth.height.endOfTerm,
        },
        weight: {
          beginningOfTerm: report.physicalHealth.weight.beginningOfTerm,
          endOfTerm: report.physicalHealth.weight.endOfTerm,
        },
        daysAbsentDueToIllness: report.physicalHealth.daysAbsentDueToIllness,
        natureOfIllness: report.physicalHealth.natureOfIllness,
        cleanlinessRating: report.physicalHealth.cleanlinessRating,
        remarks: report.physicalHealth.remarks,
      },
      clubs: {
        organization: report.clubs.organization,
      },
    },
  };
};
