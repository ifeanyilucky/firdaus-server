"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.juniorReportConfig = exports.seniorReportConfig = void 0;
var lodash_1 = __importDefault(require("lodash"));
var seniorReportConfig = function (report) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
    var getReportYear = new Date(report.reportYear).getFullYear();
    var totalAverageScore = lodash_1.default.sumBy(report.performance, "totalWeightedAverage");
    var totalDefaultAverageScore = report.performance.length * 100;
    var averagePercentage = totalAverageScore / 100;
    return {
        report: __assign(__assign({}, report), { classTeacherComment: (report === null || report === void 0 ? void 0 : report.classTeacherComment) || "", numberOfStudents: (report === null || report === void 0 ? void 0 : report.numberOfStudents) || "", totalDefaultAverageScore: totalDefaultAverageScore || "", averagePercentage: averagePercentage || "", totalAverageScore: totalAverageScore || "", reportClass: (report === null || report === void 0 ? void 0 : report.reportClass) || "", performance: (report === null || report === void 0 ? void 0 : report.performance) || [], publishDate: (report === null || report === void 0 ? void 0 : report.publishDate) || "", reportTerm: (report === null || report === void 0 ? void 0 : report.reportTerm) || "", reportYear: getReportYear || "", schoolReopenDate: (report === null || report === void 0 ? void 0 : report.schoolReopenDate) || "", personalTrait: {
                punctuality: ((_a = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _a === void 0 ? void 0 : _a.punctuality) || "",
                neatness: ((_b = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _b === void 0 ? void 0 : _b.neatness) || "",
                leadership: ((_c = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _c === void 0 ? void 0 : _c.leadership) || "",
                trait: ((_d = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _d === void 0 ? void 0 : _d.trait) || "",
                demeanor: ((_e = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _e === void 0 ? void 0 : _e.demeanor) || "",
                respect: ((_f = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _f === void 0 ? void 0 : _f.respect) || "",
                honesty: ((_g = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _g === void 0 ? void 0 : _g.honesty) || "",
                mixing: ((_h = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _h === void 0 ? void 0 : _h.mixing) || "",
                obedience: ((_j = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _j === void 0 ? void 0 : _j.obedience) || "",
                teamWork: ((_k = report === null || report === void 0 ? void 0 : report.personalTrait) === null || _k === void 0 ? void 0 : _k.teamWork) || "",
            }, affectiveDomain: {
                punctuality: ((_l = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _l === void 0 ? void 0 : _l.punctuality) || "",
                politeness: ((_m = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _m === void 0 ? void 0 : _m.politeness) || "",
                attentiveness: ((_o = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _o === void 0 ? void 0 : _o.attentiveness) || "",
                neatness: ((_p = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _p === void 0 ? void 0 : _p.neatness) || "",
                initiative: ((_q = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _q === void 0 ? void 0 : _q.initiative) || "",
                perseverance: ((_r = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _r === void 0 ? void 0 : _r.perseverance) || "",
                teamWork: (_s = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _s === void 0 ? void 0 : _s.teamWork,
                leadershipSpirit: ((_t = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _t === void 0 ? void 0 : _t.leadershipSpirit) || "",
                relationshipWithTeachers: ((_u = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _u === void 0 ? void 0 : _u.relationshipWithTeachers) || "",
                attitudeToWork: ((_v = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _v === void 0 ? void 0 : _v.attitudeToWork) || "",
                health: (_w = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _w === void 0 ? void 0 : _w.health,
                emotionalStability: ((_x = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _x === void 0 ? void 0 : _x.emotionalStability) || "",
                innovative: ((_y = report === null || report === void 0 ? void 0 : report.affectiveDomain) === null || _y === void 0 ? void 0 : _y.innovative) || "",
            }, personalSkills: {
                literary: ((_z = report === null || report === void 0 ? void 0 : report.personalSkills) === null || _z === void 0 ? void 0 : _z.literary) || "",
                technical: ((_0 = report === null || report === void 0 ? void 0 : report.personalSkills) === null || _0 === void 0 ? void 0 : _0.technical) || "",
                innovative: ((_1 = report === null || report === void 0 ? void 0 : report.personalSkills) === null || _1 === void 0 ? void 0 : _1.innovative) || "",
                sporting: ((_2 = report === null || report === void 0 ? void 0 : report.personalSkills) === null || _2 === void 0 ? void 0 : _2.sporting) || "",
                quranMemorization: ((_3 = report === null || report === void 0 ? void 0 : report.personalSkills) === null || _3 === void 0 ? void 0 : _3.quranMemorization) || "",
                hadithSkill: ((_4 = report === null || report === void 0 ? void 0 : report.personalSkills) === null || _4 === void 0 ? void 0 : _4.hadithSkill) || "",
                arabiyyaAndFiqhu: ((_5 = report === null || report === void 0 ? void 0 : report.personalSkills) === null || _5 === void 0 ? void 0 : _5.arabiyyaAndFiqhu) || "",
                cultural: ((_6 = report === null || report === void 0 ? void 0 : report.personalSkills) === null || _6 === void 0 ? void 0 : _6.cultural) || "",
            }, sports: {
                ballGames: ((_7 = report === null || report === void 0 ? void 0 : report.sports) === null || _7 === void 0 ? void 0 : _7.ballGames) || "",
                track: ((_8 = report === null || report === void 0 ? void 0 : report.sports) === null || _8 === void 0 ? void 0 : _8.track) || "",
                throws: ((_9 = report === null || report === void 0 ? void 0 : report.sports) === null || _9 === void 0 ? void 0 : _9.throws) || "",
                swimming: ((_10 = report === null || report === void 0 ? void 0 : report.sports) === null || _10 === void 0 ? void 0 : _10.swimming) || "",
                jumps: ((_11 = report === null || report === void 0 ? void 0 : report.sports) === null || _11 === void 0 ? void 0 : _11.jumps) || "",
            }, attendance: {
                timesSchoolOpened: (report === null || report === void 0 ? void 0 : report.attendance).timesSchoolOpened || "",
                timePresent: (report === null || report === void 0 ? void 0 : report.attendance).timePresent || "",
                timeAbsent: (report === null || report === void 0 ? void 0 : report.attendance).timeAbsent || "",
            }, 
            // attendance: {
            //   timesSchoolOpened:
            //     (report?.attendance as ISeniorAttendance).timesSchoolOpened || "",
            //   timePresent:
            //     (report?.attendance as ISeniorAttendance).timePresent || "",
            //   timeAbsent: (report?.attendance as ISeniorAttendance).timeAbsent || "",
            // },
            student: {
                admissionNumber: report.student.admissionNumber,
                firstName: report.student.firstName,
                lastName: report.student.lastName,
                middleName: report.student.middleName,
            } }),
    };
};
exports.seniorReportConfig = seniorReportConfig;
var juniorReportConfig = function (report) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
    var getReportYear = new Date(report.reportYear).getFullYear();
    // const totalAverageScore = _.sumBy(report.performance, "totalWeightedAverage");
    var totalAverageScore = lodash_1.default.sumBy(report.performance, function (item) {
        return Number(item.totalWeightedAverage);
    });
    var totalDefaultAverageScore = report.performance.length * 100;
    var averagePercentage = Math.floor((Number(totalAverageScore) / Number(totalDefaultAverageScore)) * 100);
    return {
        report: __assign(__assign({}, report), { performance: report.performance || [], totalAverageScore: totalAverageScore || "", averagePercentage: averagePercentage || "", totalDefaultAverageScore: totalDefaultAverageScore || "", schoolReopenDate: (report === null || report === void 0 ? void 0 : report.schoolReopenDate) || "", numberOfStudents: (report === null || report === void 0 ? void 0 : report.numberOfStudents) || "", reportYear: getReportYear || "", reportClass: (report === null || report === void 0 ? void 0 : report.reportClass) || "", reportTerm: (report === null || report === void 0 ? void 0 : report.reportTerm) || "", position: (report === null || report === void 0 ? void 0 : report.position) || "", timesPunctual: (report === null || report === void 0 ? void 0 : report.timesPunctual) || "", principalComment: report.principalComment || "", sports: {
                ballGames: ((_a = report === null || report === void 0 ? void 0 : report.sports) === null || _a === void 0 ? void 0 : _a.ballGames) || "",
                track: ((_b = report === null || report === void 0 ? void 0 : report.sports) === null || _b === void 0 ? void 0 : _b.track) || "",
                throws: ((_c = report === null || report === void 0 ? void 0 : report.sports) === null || _c === void 0 ? void 0 : _c.throws) || "",
                swimming: ((_d = report === null || report === void 0 ? void 0 : report.sports) === null || _d === void 0 ? void 0 : _d.swimming) || "",
                jumps: ((_e = report === null || report === void 0 ? void 0 : report.sports) === null || _e === void 0 ? void 0 : _e.jumps) || "",
            }, conduct: {
                comments: ((_f = report === null || report === void 0 ? void 0 : report.conduct) === null || _f === void 0 ? void 0 : _f.comments) || "",
            }, attendance: {
                school: {
                    timesSchoolOpened: ((_h = (_g = report === null || report === void 0 ? void 0 : report.attendance) === null || _g === void 0 ? void 0 : _g.school) === null || _h === void 0 ? void 0 : _h.timesSchoolOpenedAndActivities) || "",
                    timeAbsent: ((_k = (_j = report === null || report === void 0 ? void 0 : report.attendance) === null || _j === void 0 ? void 0 : _j.school) === null || _k === void 0 ? void 0 : _k.timesAbsent) ||
                        "",
                    timePunctual: ((_m = (_l = report === null || report === void 0 ? void 0 : report.attendance) === null || _l === void 0 ? void 0 : _l.school) === null || _m === void 0 ? void 0 : _m.timesPunctual) ||
                        "",
                },
                sportAndAthletics: {
                    timesSchoolOpened: ((_p = (_o = report === null || report === void 0 ? void 0 : report.attendance) === null || _o === void 0 ? void 0 : _o.sportAndAthletics) === null || _p === void 0 ? void 0 : _p.timesAbsent) || "",
                    timeAbsent: (_q = report === null || report === void 0 ? void 0 : report.attendance) === null || _q === void 0 ? void 0 : _q.sportAndAthletics.timesAbsent,
                    timePunctual: ((_s = (_r = report === null || report === void 0 ? void 0 : report.attendance) === null || _r === void 0 ? void 0 : _r.sportAndAthletics) === null || _s === void 0 ? void 0 : _s.timesPunctual) || "",
                },
                otherOrganizedActivities: {
                    timesSchoolOpened: ((_u = (_t = report === null || report === void 0 ? void 0 : report.attendance) === null || _t === void 0 ? void 0 : _t.sportAndAthletics) === null || _u === void 0 ? void 0 : _u.timesAbsent) || "",
                    timeAbsent: ((_w = (_v = report === null || report === void 0 ? void 0 : report.attendance) === null || _v === void 0 ? void 0 : _v.sportAndAthletics) === null || _w === void 0 ? void 0 : _w.timesAbsent) || "",
                    timePunctual: ((_y = (_x = report === null || report === void 0 ? void 0 : report.attendance) === null || _x === void 0 ? void 0 : _x.sportAndAthletics) === null || _y === void 0 ? void 0 : _y.timesPunctual) || "",
                },
            }, physicalHealth: {
                height: {
                    beginningOfTerm: ((_z = report === null || report === void 0 ? void 0 : report.physicalHealth) === null || _z === void 0 ? void 0 : _z.height.beginningOfTerm) || "",
                    endOfTerm: ((_0 = report === null || report === void 0 ? void 0 : report.physicalHealth) === null || _0 === void 0 ? void 0 : _0.height.endOfTerm) || "",
                },
                weight: {
                    beginningOfTerm: ((_1 = report === null || report === void 0 ? void 0 : report.physicalHealth) === null || _1 === void 0 ? void 0 : _1.weight.beginningOfTerm) || "",
                    endOfTerm: ((_2 = report === null || report === void 0 ? void 0 : report.physicalHealth) === null || _2 === void 0 ? void 0 : _2.weight.endOfTerm) || "",
                },
                daysAbsentDueToIllness: ((_3 = report === null || report === void 0 ? void 0 : report.physicalHealth) === null || _3 === void 0 ? void 0 : _3.daysAbsentDueToIllness) || "",
                natureOfIllness: ((_4 = report === null || report === void 0 ? void 0 : report.physicalHealth) === null || _4 === void 0 ? void 0 : _4.natureOfIllness) || "",
                cleanlinessRating: ((_5 = report === null || report === void 0 ? void 0 : report.physicalHealth) === null || _5 === void 0 ? void 0 : _5.cleanlinessRating) || "",
                remarks: ((_6 = report === null || report === void 0 ? void 0 : report.physicalHealth) === null || _6 === void 0 ? void 0 : _6.remarks) || "",
            }, clubs: {
                organization: ((_7 = report === null || report === void 0 ? void 0 : report.clubs) === null || _7 === void 0 ? void 0 : _7.organization) || "",
            }, student: __assign(__assign({}, report === null || report === void 0 ? void 0 : report.student), { admissionNumber: (report === null || report === void 0 ? void 0 : report.student).admissionNumber, firstName: (report === null || report === void 0 ? void 0 : report.student).firstName, lastName: (report === null || report === void 0 ? void 0 : report.student).lastName, middleName: (report === null || report === void 0 ? void 0 : report.student).middleName || "" }), teacher: {
                teacherSignature: ((_8 = report.teacher) === null || _8 === void 0 ? void 0 : _8.teacherSignature) || "",
            } }),
    };
};
exports.juniorReportConfig = juniorReportConfig;
//# sourceMappingURL=ejs-config.js.map