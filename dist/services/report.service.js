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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
var report_model_1 = require("../models/report.model");
var term_model_1 = require("../models/term.model");
var ejs_1 = __importDefault(require("ejs"));
var path_1 = __importDefault(require("path"));
var user_model_1 = require("../models/user.model");
var error_1 = require("../error");
var mongoose_1 = __importDefault(require("mongoose"));
var ejs_config_1 = require("../config/ejs-config");
var ObjectId = mongoose_1.default.Schema.ObjectId;
exports.ReportService = {
    findReport: function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = params.id;
                        return [4 /*yield*/, report_model_1.Report.findOne({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    allReports: function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var student, reportTerm, reportClass, status, teacher, queryObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        student = query.student, reportTerm = query.reportTerm, reportClass = query.reportClass, status = query.status, teacher = query.teacher;
                        queryObject = {};
                        if (student) {
                            queryObject.student = new mongoose_1.default.Types.ObjectId(student);
                        }
                        if (reportTerm) {
                            queryObject.reportTerm = reportTerm;
                        }
                        if (reportClass) {
                            queryObject.reportClass = reportClass;
                        }
                        if (status) {
                            queryObject.status = status;
                        }
                        if (teacher) {
                            queryObject.teacher = new mongoose_1.default.Types.ObjectId(teacher);
                        }
                        return [4 /*yield*/, report_model_1.Report.find(queryObject)
                                .populate("teacher")
                                .populate("student")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    deleteReport: function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = params.id;
                        return [4 /*yield*/, report_model_1.Report.findOneAndDelete({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    updateReport: function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, updatedReport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = params.id, data = params.data;
                        return [4 /*yield*/, report_model_1.Report.findOneAndUpdate({ id: id }, __assign({}, data), { new: true })];
                    case 1:
                        updatedReport = _a.sent();
                        return [2 /*return*/, updatedReport];
                }
            });
        });
    },
    createReport: function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data, teacherId, existingReport, student, currentDate, currentTerm, newReport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = params.data, teacherId = params.teacherId;
                        console.log(JSON.stringify(params.data));
                        return [4 /*yield*/, report_model_1.Report.findOne({
                                admissionNumber: data.admissionNumber,
                                reportTerm: data.reportTerm,
                                reportClass: params.reportClass,
                            })];
                    case 1:
                        existingReport = _a.sent();
                        // const existingReport = await Report.findOne({
                        //   student: data.student,
                        //   reportTerm: data.reportTerm,
                        //   reportClass: params.reportClass,
                        // });
                        if (existingReport)
                            throw new error_1.BadRequestError("Report already exists for this student.");
                        return [4 /*yield*/, user_model_1.User.findOne({
                                admissionNumber: data.admissionNumber,
                            })];
                    case 2:
                        student = _a.sent();
                        currentDate = new Date();
                        return [4 /*yield*/, term_model_1.Term.findOne({
                                startDate: { $lte: currentDate },
                                endDate: { $gte: currentDate },
                            })];
                    case 3:
                        currentTerm = _a.sent();
                        return [4 /*yield*/, report_model_1.Report.create(__assign(__assign({}, data), { student: student === null || student === void 0 ? void 0 : student._id, teacher: teacherId, reportTerm: currentTerm === null || currentTerm === void 0 ? void 0 : currentTerm.name, reportYear: currentTerm === null || currentTerm === void 0 ? void 0 : currentTerm.startDate, reportClass: params.reportClass }))];
                    case 4:
                        newReport = _a.sent();
                        return [2 /*return*/, newReport];
                }
            });
        });
    },
    // GET AND CONVERT REPORT TO PDF AND SEND THE FILE PATH TO CONTROLLER
    downloadReport: function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var student, selectedTerm, selectedClass, reportId, user, classSection, report, personalSkills, affectiveDomain, personalTrait, publishDate, conduct, sports, attendance, std, htmlReport, reportPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        student = params.student, selectedTerm = params.selectedTerm, selectedClass = params.selectedClass, reportId = params.reportId, user = params.user, classSection = params.classSection;
                        console.log("selected term", selectedTerm);
                        console.log("selected class", selectedClass);
                        console.log("class section", classSection);
                        console.log("student", student);
                        return [4 /*yield*/, report_model_1.Report.findOne({
                                reportTerm: selectedTerm,
                                reportClass: selectedClass,
                                student: student,
                                classSection: classSection,
                            })
                                .populate("student")
                                .populate("teacher")];
                    case 1:
                        report = _a.sent();
                        console.log(report);
                        if (!report) {
                            throw new error_1.NotFoundError("You do not have a report for this session");
                        }
                        personalSkills = report.personalSkills, affectiveDomain = report.affectiveDomain, personalTrait = report.personalTrait, publishDate = report.publishDate, conduct = report.conduct, sports = report.sports, attendance = report.attendance, std = report.student;
                        htmlReport = "";
                        if (report.classSection == "junior") {
                            ejs_1.default.renderFile(path_1.default.join(__dirname, "../views/junior-report.ejs"), {
                                report: (0, ejs_config_1.juniorReportConfig)(report).report,
                            }, 
                            // @ts-ignore
                            function (err, html) {
                                if (err) {
                                    console.log(err);
                                }
                                htmlReport = html;
                            });
                        }
                        if (report.classSection == "senior") {
                            ejs_1.default.renderFile(path_1.default.join(__dirname, "../views/senior-report.ejs"), {
                                report: (0, ejs_config_1.seniorReportConfig)(report).report,
                            }, 
                            // @ts-ignore
                            function (err, html) {
                                if (err) {
                                    console.log(err);
                                }
                                htmlReport = html;
                            });
                        }
                        if (report.classSection == "primary") {
                            return [2 /*return*/, null];
                        }
                        else if (report.classSection == "elementary") {
                            return [2 /*return*/, null];
                        }
                        reportPath = path_1.default.join(__dirname, "../tmp/report-sheet.pdf");
                        // const pdfReport = await axios.post("http://localhost:8080/to-pdf", {
                        //   html: htmlReport,
                        // });
                        // fs.writeFile(reportPath, pdfReport.data, (err) => {
                        //   if (err) {
                        //     console.log(err);
                        //     return;
                        //   }
                        //   console.log("PDF received and saved on Server");
                        // });
                        // convert html to pdf
                        // await convertToPdf(htmlReport, reportPath)
                        //   .then(() => {
                        //     console.log("Pdf created successfully");
                        //   })
                        //   .catch((error) => {
                        //     console.log("Error generating PDF", error);
                        //   });
                        return [2 /*return*/, htmlReport];
                }
            });
        });
    },
    getReportsByTeacher: function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var reports;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, report_model_1.Report.find({})];
                    case 1:
                        reports = _a.sent();
                        return [2 /*return*/, reports];
                }
            });
        });
    },
};
// https://generate-pdf-emhz.onrender.com/
//# sourceMappingURL=report.service.js.map