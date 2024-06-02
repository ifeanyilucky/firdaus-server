"use strict";
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
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var connect_1 = require("./db/connect");
var app_1 = require("./config/app");
require("express-async-errors");
var errorhandler_middleware_1 = require("./middlewares/errorhandler.middleware");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var routes_1 = __importDefault(require("./routes"));
var notfound_middleware_1 = require("./middlewares/notfound.middleware");
var yamljs_1 = __importDefault(require("yamljs"));
var cors_1 = __importDefault(require("cors"));
var ejs_config_1 = require("./config/ejs-config");
dotenv_1.default.config();
var app = (0, express_1.default)();
// EJS
// app.set("views", "./views");
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express_1.default.static(path_1.default.join(__dirname, "/public"), { maxAge: 31557600000 }));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1", routes_1.default);
// app.use("/students", studentController.routes());
app.get("/", function (req, res) {
    res.send("<div>Welcome to Firdaus API Server<br/> <a href=\"/api-docs\">Click here \uD83D\uDC7D\uD83D\uDC7B</a> to navigate to API documentation </div>");
});
app.get("/report-preview", function (req, res) {
    res.render("/senior-report.ejs", {});
});
// app.use('/receipt', (req, res) => {
//   res.render('emails/payment-receipt.ejs', {
//     config,
//     firstName: 'lucky',
//     lastName: 'Ifeanyi',
//     hostelName: '3 bedroom flat available at igando',
//     area: 'Iganod',
//     totalCost: '300000',
//     agreementCommissionFee: 3000,
//     agencyFee: '30000',
//     rentFee: '3000',
//     cautionFee: '30000',
//   });
// });
// app.use('/submitted', (req, res) => {
//   res.render('emails/payment-submitted.ejs');
// });
app.use(errorhandler_middleware_1.ErrorHandler);
var swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "./docs/swagger.yaml"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument, { explorer: true }));
app.get("/report-sheet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render("/senior-report.ejs", {
            report: (0, ejs_config_1.seniorReportConfig)({}).report,
        });
        return [2 /*return*/];
    });
}); });
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:3001"],
}));
app.use(notfound_middleware_1.NotFound);
var PORT = process.env.PORT || 4000;
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, connect_1.connectDb)(app_1.appConfig.databaseUrl)];
            case 1:
                _a.sent();
                app.listen(PORT, function () {
                    console.log("Server \u26A1 is running on http://localhost:".concat(PORT, " Environment: ").concat(process.env.NODE_ENV));
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start();
//# sourceMappingURL=index.js.map