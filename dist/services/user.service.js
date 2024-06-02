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
exports.UserService = void 0;
var error_1 = require("../error");
var user_model_1 = require("../models/user.model");
var cloudinary_1 = require("../utils/cloudinary");
var crypto_1 = __importDefault(require("crypto"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var ejs_1 = __importDefault(require("ejs"));
var path_1 = __importDefault(require("path"));
var sendemail_1 = require("../utils/sendemail");
var subjects_1 = require("../config/subjects");
var subject_model_1 = require("../models/subject.model");
exports.UserService = {
    getUser: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.User.findOne({ _id: id })
                        .populate("reports")
                        .select("-password")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    deleteUser: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.User.findOneAndDelete({ _id: id })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    createUser: function (data, file) { return __awaiter(void 0, void 0, void 0, function () {
        var subjects, teacherSignature, studentSubject, classTeacher, existingStudent, existingTeacher, upload, existingDepartment, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subjects = [];
                    teacherSignature = "";
                    studentSubject = [];
                    // ASSIGN SUBJECTS TO TEACHER AND STUDENT
                    if (data.role === "student" || data.role === "teacher") {
                        if (["FGNSC_001", "FGNSC_002", "FGKGC_002"].includes(data.currentClass)) {
                            subjects = subjects_1.ElementarySubjects;
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
                    if (!(data.role === "student")) return [3 /*break*/, 3];
                    if (!!data.admissionNumber) return [3 /*break*/, 1];
                    throw new error_1.BadRequestError("Please enter admission number");
                case 1: return [4 /*yield*/, user_model_1.User.findOne({
                        admissionNumber: data.admissionNumber,
                    })];
                case 2:
                    existingStudent = _a.sent();
                    if (existingStudent)
                        throw new error_1.BadRequestError("Student with this admission number already exists");
                    _a.label = 3;
                case 3:
                    if (!(data.role === "teacher")) return [3 /*break*/, 8];
                    if (!!(data === null || data === void 0 ? void 0 : data.teacherId)) return [3 /*break*/, 4];
                    throw new error_1.BadRequestError("Please enter teacher ID");
                case 4: return [4 /*yield*/, user_model_1.User.findOne({
                        teacherId: data.teacherId,
                    })];
                case 5:
                    existingTeacher = _a.sent();
                    if (existingTeacher) {
                        throw new error_1.BadRequestError("Teacher with this ID already exists");
                    }
                    _a.label = 6;
                case 6:
                    if (!(file === null || file === void 0 ? void 0 : file.path)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, cloudinary_1.cloudUpload)(file === null || file === void 0 ? void 0 : file.path, "teacher-signature")];
                case 7:
                    upload = _a.sent();
                    teacherSignature = upload;
                    _a.label = 8;
                case 8:
                    existingDepartment = ["art", "commercial", "science"].some(function (item) { return item === data.department; });
                    console.log(data);
                    console.log(subjects);
                    return [4 /*yield*/, user_model_1.User.create(__assign(__assign({}, data), { teacherSignature: teacherSignature, department: existingDepartment ? data.department : "none", subjects: studentSubject }))];
                case 9:
                    user = _a.sent();
                    return [4 /*yield*/, subject_model_1.Subject.create({
                            subjects: subjects,
                            user_id: user._id,
                        })];
                case 10:
                    _a.sent();
                    return [2 /*return*/, user];
            }
        });
    }); },
    updateUser: function (id, params) { return __awaiter(void 0, void 0, void 0, function () {
        var data, teacherSignature, uploadSignature;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = params.data;
                    teacherSignature = params.user.teacherSignature;
                    if (!((_a = params.file) === null || _a === void 0 ? void 0 : _a.path)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, cloudinary_1.cloudUpload)(params.file.path, "teacher-signature")];
                case 1:
                    uploadSignature = _b.sent();
                    teacherSignature = uploadSignature;
                    _b.label = 2;
                case 2: return [4 /*yield*/, user_model_1.User.findOneAndUpdate({ _id: id }, __assign(__assign({}, data), { teacherSignature: teacherSignature }), { new: true })];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    }); },
    getUsers: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, role, _id, department, classHandled, currentClass, classTeacher, firstName, lastName, status, sort, queryObject, result, sortList, page, limit, skip, users, totalDocuments, totalPages;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = params.query, role = _a.role, _id = _a._id, department = _a.department, classHandled = _a.classHandled, currentClass = _a.currentClass, classTeacher = _a.classTeacher, firstName = _a.firstName, lastName = _a.lastName, status = _a.status, sort = _a.sort;
                    queryObject = {};
                    if (role) {
                        queryObject.role = role;
                    }
                    if (firstName) {
                        queryObject.firstName = { $regex: firstName, $options: "i" };
                    }
                    if (lastName) {
                        queryObject.lastName = { $regex: lastName, $options: "i" };
                    }
                    if (_id) {
                        queryObject._id = _id;
                    }
                    if (classTeacher) {
                        queryObject.classTeacher = classTeacher;
                    }
                    if (department) {
                        queryObject.department = department;
                    }
                    if (classHandled) {
                        queryObject.classHandled = classHandled;
                    }
                    if (currentClass) {
                        queryObject.currentClass = currentClass;
                    }
                    if (status) {
                        queryObject.status = status;
                    }
                    result = user_model_1.User.find(queryObject);
                    if (sort) {
                        sortList = sort.split(",").join(" ");
                        result = result.sort(sortList);
                    }
                    else {
                        result = result.sort("-createdAt");
                    }
                    page = Number(params.page) || 1;
                    limit = Number(params.limit) || 5;
                    skip = (page - 1) * limit;
                    result = result.skip(skip).limit(limit);
                    return [4 /*yield*/, result];
                case 1:
                    users = _b.sent();
                    return [4 /*yield*/, user_model_1.User.countDocuments(queryObject)];
                case 2:
                    totalDocuments = _b.sent();
                    totalPages = Math.ceil(totalDocuments / limit);
                    return [2 /*return*/, {
                            list: users,
                            total: totalDocuments,
                            currentPage: page,
                            limit: limit,
                            totalPages: totalPages,
                        }];
            }
        });
    }); },
    multiUsers: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var allUsers;
        return __generator(this, function (_a) {
            allUsers = user_model_1.User.insertMany(data);
            return [2 /*return*/, allUsers];
        });
    }); },
    forgotPassword: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var email, user, resetToken, resetUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = params.email;
                    return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new error_1.NotFoundError("".concat(email, " not found!"));
                    }
                    resetToken = user.getResetPasswordToken();
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    resetUrl = "".concat(process.env.HOST, "/reset-password/").concat(resetToken);
                    ejs_1.default.renderFile(path_1.default.join(__dirname, "../views/emails/reset-password.ejs"), { email: user.email, resetUrl: resetUrl }, function (error, data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!error) return [3 /*break*/, 2];
                                    console.log(error);
                                    user.passwordResetToken = undefined;
                                    user.passwordResetExpire = undefined;
                                    return [4 /*yield*/, user.save()];
                                case 1:
                                    _a.sent();
                                    throw new error_1.BadRequestError("Email could not be sent");
                                case 2: return [4 /*yield*/, (0, sendemail_1.sendEmail)({
                                        to: user.email,
                                        subject: "Forgot your password? Let's get you a new one.",
                                        html: data,
                                    })];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); },
    adminChangeStudentPassword: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var newPassword, account, salt, hashNewPassword, updatePassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newPassword = params.newPassword;
                    return [4 /*yield*/, user_model_1.User.findOne({ _id: params.userId })];
                case 1:
                    account = _a.sent();
                    if (!account)
                        throw new error_1.NotFoundError("User not found");
                    return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, salt)];
                case 3:
                    hashNewPassword = _a.sent();
                    return [4 /*yield*/, user_model_1.User.findOneAndUpdate({ _id: account._id }, { password: hashNewPassword }, { new: true })];
                case 4:
                    updatePassword = _a.sent();
                    return [2 /*return*/, updatePassword];
            }
        });
    }); },
    changePassword: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var oldPassword, newPassword, account, isPasswordRight, salt, hashNewPassword, updatePassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldPassword = params.oldPassword, newPassword = params.newPassword;
                    return [4 /*yield*/, user_model_1.User.findOne({ _id: params.user._id })];
                case 1:
                    account = _a.sent();
                    if (!account)
                        throw new error_1.NotFoundError("User not found");
                    return [4 /*yield*/, account.comparePassword(oldPassword)];
                case 2:
                    isPasswordRight = _a.sent();
                    if (!isPasswordRight)
                        throw new error_1.BadRequestError("Password is incorrect");
                    return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                case 3:
                    salt = _a.sent();
                    return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, salt)];
                case 4:
                    hashNewPassword = _a.sent();
                    return [4 /*yield*/, user_model_1.User.findOneAndUpdate({ _id: account._id }, { password: hashNewPassword }, { new: true })];
                case 5:
                    updatePassword = _a.sent();
                    return [2 /*return*/, updatePassword];
            }
        });
    }); },
    resetPassword: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var resetPasswordToken, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetPasswordToken = crypto_1.default
                        .createHash("sha256")
                        .update(params.token)
                        .digest("hex");
                    return [4 /*yield*/, user_model_1.User.findOne({
                            resetPasswordToken: resetPasswordToken,
                            passwordResetExpire: { $gt: Date.now() },
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new error_1.BadRequestError("Invalid reset token");
                    }
                    user.password = params.password;
                    user.passwordResetToken = undefined;
                    user.passwordResetExpire = undefined;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    removeSubject: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var subjectCode, userId, updatedSubjects, newSubjects, newSubjects, newSubjects;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subjectCode = params.subjectCode, userId = params.userId;
                    updatedSubjects = null;
                    if (!subjects_1.BasicSubjects.filter(function (item) { return item.code === subjectCode; })) return [3 /*break*/, 2];
                    newSubjects = subjects_1.BasicSubjects.filter(function (item) { return item.code !== subjectCode; });
                    return [4 /*yield*/, user_model_1.User.findOneAndUpdate({ _id: userId }, { subjects: newSubjects })];
                case 1:
                    updatedSubjects = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!subjects_1.ElementarySubjects.filter(function (item) { return item.code === subjectCode; })) return [3 /*break*/, 4];
                    newSubjects = subjects_1.ElementarySubjects.filter(function (item) { return item.code !== subjectCode; });
                    return [4 /*yield*/, user_model_1.User.findOneAndUpdate({ _id: userId }, { subjects: newSubjects })];
                case 3:
                    updatedSubjects = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!subjects_1.ScienceSubjects.filter(function (item) { return item.code === subjectCode; })) return [3 /*break*/, 6];
                    newSubjects = subjects_1.ScienceSubjects.filter(function (item) { return item.code !== subjectCode; });
                    return [4 /*yield*/, user_model_1.User.findOneAndUpdate({ _id: userId }, { subjects: newSubjects })];
                case 5:
                    updatedSubjects = _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/, updatedSubjects];
            }
        });
    }); },
};
//# sourceMappingURL=user.service.js.map