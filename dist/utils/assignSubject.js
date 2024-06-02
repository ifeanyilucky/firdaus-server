"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSubject = void 0;
var class_code_1 = require("../config/class_code");
var subjects_1 = require("../config/subjects");
var assignSubject = function (classCode, department) {
    if ([class_code_1.kgOne, class_code_1.kgTwo].includes(classCode)) {
        return {
            subject: subjects_1.ElementarySubjects,
        };
    }
    if ([class_code_1.pryOne, class_code_1.pryTwo, class_code_1.pryThree, class_code_1.pryFour, class_code_1.pryFive, class_code_1.prySix].includes(classCode)) {
        return {
            subject: subjects_1.BasicSubjects,
        };
    }
    if ([class_code_1.jssOne, class_code_1.jssTwo, class_code_1.jssThree].includes(classCode)) {
        return {
            subject: subjects_1.JuniorSubjects,
        };
    }
    if ([class_code_1.sssOne, class_code_1.sssTwo, class_code_1.sssThree].includes(classCode)) {
        if (department === "science") {
            return {
                subject: subjects_1.ScienceSubjects,
                department: department,
            };
        }
        if (department === "commercial") {
            return {
                subject: subjects_1.CommercialSubjects,
                department: department,
            };
        }
        if (department === "art") {
            return {
                subject: subjects_1.ArtsSubjects,
                department: department,
            };
        }
    }
    return null;
};
exports.assignSubject = assignSubject;
//# sourceMappingURL=assignSubject.js.map