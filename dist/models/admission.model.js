"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admission = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var AdmissionSchema = new mongoose_1.default.Schema({
    parentInformation: Object,
    studentInformation: Object,
    payment: Object,
    id: String,
}, { timestamps: true });
exports.Admission = mongoose_1.default.model("Admission", AdmissionSchema);
//# sourceMappingURL=admission.model.js.map