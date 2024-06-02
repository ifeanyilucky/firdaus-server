"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = exports.ReportSchema = void 0;
var Mongoose = __importStar(require("mongoose"));
exports.ReportSchema = new Mongoose.Schema({
    performance: [],
    timesSchoolOpenedAndActivities: String,
    timesPunctual: String,
    schoolReopenDate: String,
    attendance: {
        type: Object,
    },
    sports: Object,
    clubs: Object,
    position: String,
    physicalHealth: Object,
    schoolReopens: String,
    numberOfStudents: String,
    conduct: Object,
    teacher: {
        type: Mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please assign class teacher to this report"],
    },
    personalTrait: {
        type: Object,
    },
    classTeacherComment: {
        type: String,
    },
    principalComment: String,
    status: {
        type: String,
        enum: ["PUBLISHED", "DRAFT"],
        default: "DRAFT",
    },
    student: {
        type: Mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    reportTerm: {
        type: String,
        required: [true, "Please enter term of student report"],
        enum: ["FIRST TERM", "SECOND TERM", "THIRD TERM"],
    },
    reportClass: {
        type: String,
        enum: [
            "FGKGC_001",
            "FGKGC_002",
            "FGNSC_001",
            "FGNSC_002",
            "FGBSC_001",
            "FGBSC_002",
            "FGBSC_003",
            "FGBSC_004",
            "FGBSC_005",
            "FGBSC_006",
            "FGJSC_001",
            "FGJSC_002",
            "FGJSC_002",
            "FGJSC_003",
            "FGSSC_001",
            "FGSSC_002",
            "FGSSC_003",
            "none",
        ],
        required: [true, "Please specify student class"],
    },
    classSection: {
        type: String,
        enum: ["junior", "senior", "elementary", "primary"],
        required: [true, "Class section is required"],
    },
    affectiveDomain: Object,
    personalSkills: Object,
    publishDate: Date,
    reportYear: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Report = Mongoose.model("Report", exports.ReportSchema);
//# sourceMappingURL=report.model.js.map