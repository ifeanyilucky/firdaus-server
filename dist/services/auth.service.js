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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var error_1 = require("../error");
var user_model_1 = require("../models/user.model");
var app_1 = require("../config/app");
var subject_model_1 = require("../models/subject.model");
var subjects_1 = require("../config/subjects");
// Register service
exports.AuthService = {
    register: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var data, subjects, existingTeacher, existingEmail, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = params.data;
                    subjects = [];
                    if (!(data.role === app_1.ROLES.TEACHER)) return [3 /*break*/, 2];
                    return [4 /*yield*/, user_model_1.User.findOne({
                            teacherId: data.teacherId,
                        })];
                case 1:
                    existingTeacher = _a.sent();
                    if (existingTeacher)
                        throw new error_1.BadRequestError("Teacher with this teacher id already existed");
                    _a.label = 2;
                case 2: return [4 /*yield*/, user_model_1.User.findOne({ email: data.email })];
                case 3:
                    existingEmail = _a.sent();
                    if (existingEmail)
                        throw new error_1.BadRequestError("User with this email already existed");
                    return [4 /*yield*/, user_model_1.User.create(__assign({}, data))];
                case 4:
                    user = _a.sent();
                    if (data.role === app_1.ROLES.STUDENT || data.role === app_1.ROLES.TEACHER) {
                        if (["FGNSC_001", "FGNSC_002"].includes(data.currentClass)) {
                            subjects = subjects_1.ElementarySubjects;
                        }
                        if (data.currentClass === "FGKGC_002") {
                            subjects = subjects_1.BasicSubjects;
                        }
                        if ([
                            "FGBSC_001",
                            "FGBSC_002",
                            "FGBSC_003",
                            "FGBSC_004",
                            "FGBSC_005",
                            "FGBSC_006",
                        ].includes(data.currentClass)) {
                            subjects = subjects_1.BasicSubjects;
                        }
                        if (["FGJSC_001", "FGJSC_002", "FGJSC_003"].includes(data.currentClass)) {
                            subjects = subjects_1.JuniorSubjects;
                        }
                        if (["FGSSC_001", "FGSSC_002", "FGSSC_003"].includes(data.currentClass)) {
                            if (data.department === "science") {
                                subjects = subjects_1.ScienceSubjects;
                            }
                            if (data.department === "art") {
                                subjects = subjects_1.ArtsSubjects;
                            }
                            if (data.department === "commercial") {
                                subjects === subjects_1.CommercialSubjects;
                            }
                        }
                    }
                    console.log(subjects);
                    return [4 /*yield*/, subject_model_1.Subject.create({
                            subjects: subjects,
                            user_id: user._id,
                        })];
                case 5:
                    _a.sent();
                    token = user.createJwt();
                    return [2 /*return*/, { data: user, token: token }];
            }
        });
    }); },
    // Login service
    login: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, admissionNumber, password, email, teacherId, role, user, passwordIsCorrect, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = params.loginData, admissionNumber = _a.admissionNumber, password = _a.password, email = _a.email, teacherId = _a.teacherId, role = _a.role;
                    user = null;
                    if (!(role === app_1.ROLES.STUDENT)) return [3 /*break*/, 2];
                    if (!admissionNumber && !password)
                        throw new error_1.BadRequestError("Please provide admission number and password");
                    return [4 /*yield*/, user_model_1.User.findOne({
                            admissionNumber: admissionNumber,
                        })];
                case 1:
                    user = _b.sent();
                    if (!user)
                        throw new error_1.NotFoundError("Cannot find student with this admission number!");
                    _b.label = 2;
                case 2:
                    if (!(role === app_1.ROLES.TEACHER)) return [3 /*break*/, 4];
                    if (!teacherId && !password)
                        throw new error_1.BadRequestError("Please provide teacher id and password");
                    return [4 /*yield*/, user_model_1.User.findOne({ teacherId: teacherId })];
                case 3:
                    user = _b.sent();
                    if (!user)
                        throw new error_1.NotFoundError("Cannot find teacher with this teacher id");
                    _b.label = 4;
                case 4:
                    if (!(role === app_1.ROLES.ADMIN)) return [3 /*break*/, 6];
                    if (!email && password)
                        throw new error_1.BadRequestError("Please provide email and password");
                    return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
                case 5:
                    user = _b.sent();
                    if (!user) {
                        throw new error_1.NotFoundError("Cannot find user with this email");
                    }
                    _b.label = 6;
                case 6:
                    if ((user === null || user === void 0 ? void 0 : user.status) === "inactive")
                        throw new error_1.BadRequestError("Sorry, you currently cannot login to your profile at the moment, kindly see or contact the school management");
                    return [4 /*yield*/, user.comparePassword(password)];
                case 7:
                    passwordIsCorrect = _b.sent();
                    if (!passwordIsCorrect)
                        throw new error_1.BadRequestError("Password is incorrect");
                    token = user.createJwt();
                    return [2 /*return*/, { data: user, token: token }];
            }
        });
    }); },
    account: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = params.id;
                    return [4 /*yield*/, user_model_1.User.findOne({ _id: id })];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new error_1.NotFoundError("User with this ID does not exist");
                    return [2 /*return*/, user];
            }
        });
    }); },
};
//# sourceMappingURL=auth.service.js.map