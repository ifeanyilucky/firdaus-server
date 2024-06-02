"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Term = exports.ReportStatus = void 0;
var ReportStatus;
(function (ReportStatus) {
    ReportStatus[ReportStatus["PUBLISHED"] = 0] = "PUBLISHED";
    ReportStatus[ReportStatus["DRAFT"] = 1] = "DRAFT";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
var Term;
(function (Term) {
    Term[Term["FIRST_TERM"] = 0] = "FIRST_TERM";
    Term[Term["SECOND_TERM"] = 1] = "SECOND_TERM";
    Term[Term["THIRD_TERM"] = 2] = "THIRD_TERM";
})(Term || (exports.Term = Term = {}));
//# sourceMappingURL=report.interface.js.map