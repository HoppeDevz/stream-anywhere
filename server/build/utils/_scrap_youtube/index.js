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
exports.YoutubeScrapper = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
var wait_1 = require("../../helpers/wait");
var YoutubeScrapper = /** @class */ (function () {
    function YoutubeScrapper() {
        var _this = this;
        puppeteer_1.default.launch({ headless: false }).then(function (browser) { return _this.browser = browser; });
    }
    YoutubeScrapper.prototype.verifyChannel = function (channelUserName) {
        return __awaiter(this, void 0, void 0, function () {
            var url, browser, page, liveURL, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.browser)
                            return [2 /*return*/, { live: false, href: "" }];
                        console.log("[YOUTUBE-SCRAP] - VERIFYING CHANNEL ".concat(channelUserName, "..."));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        url = "https://www.youtube.com/@".concat(channelUserName, "/featured");
                        browser = this.browser;
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.goto(url)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, wait_1.wait)(3500)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () {
                                var liveURL = "";
                                var thumbs = document.querySelectorAll("#thumbnail");
                                thumbs.forEach(function (thumb) {
                                    if (thumb.querySelector("ytd-thumbnail-overlay-time-status-renderer[overlay-style=LIVE]")) {
                                        var href = thumb.getAttribute("href");
                                        if (href)
                                            liveURL = href;
                                    }
                                });
                                return Promise.resolve(liveURL);
                            })];
                    case 5:
                        liveURL = _a.sent();
                        return [4 /*yield*/, page.close()];
                    case 6:
                        _a.sent();
                        if (liveURL !== "")
                            return [2 /*return*/, { live: true, href: liveURL }];
                        return [2 /*return*/, { live: false, href: "" }];
                    case 7:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw err_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return YoutubeScrapper;
}());
exports.YoutubeScrapper = YoutubeScrapper;
