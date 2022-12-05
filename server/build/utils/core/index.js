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
exports.Core = void 0;
var streamers_1 = require("../../data/streamers");
var wait_1 = require("../../helpers/wait");
// SCRAPPERS
var _scrap_twitch_1 = require("../_scrap_twitch");
var _scrap_youtube_1 = require("../_scrap_youtube");
var Core = /** @class */ (function () {
    function Core() {
        this.TWITCH_THREAD_TIMEOUT = 5 * 1000;
        this.YOUTUBE_THREAD_TIMEOUT = 5 * 1000;
        this.streamers = [];
        this.twitchScrapper = new _scrap_twitch_1.TwitchScrapper();
        this.youtubeScrapper = new _scrap_youtube_1.YoutubeScrapper();
        this.getStreamers();
        this.validateYoutubeStreamersThread();
        this.validateTwitchStremaersThread();
    }
    Core.prototype.getStreamers = function () {
        var _this = this;
        (0, streamers_1.getStreamers)().then(function (streamers) { return _this.streamers = streamers; });
    };
    Core.prototype.getStreamersRoute = function (req, res) {
        res.status(200).send(this.streamers);
    };
    //////////////////////////////// YOUTUBE THREAD ////////////////////////////////
    Core.prototype.validateYoutubeStreamersThread = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateYoutubeStreamers()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, wait_1.wait)(this.YOUTUBE_THREAD_TIMEOUT)];
                    case 2:
                        _a.sent();
                        this.validateYoutubeStreamersThread();
                        return [2 /*return*/];
                }
            });
        });
    };
    Core.prototype.validateYoutubeStreamers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, streamer, _a, live, href;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = 0;
                        _b.label = 1;
                    case 1:
                        if (!(index < this.streamers.length)) return [3 /*break*/, 4];
                        streamer = this.streamers[index];
                        if (!(streamer.platform === "YOUTUBE")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.youtubeScrapper.verifyChannel(streamer.channelName)];
                    case 2:
                        _a = _b.sent(), live = _a.live, href = _a.href;
                        streamer = __assign(__assign({}, streamer), { live: live, href: href });
                        _b.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //////////////////////////////// TWITCH THREAD ////////////////////////////////
    Core.prototype.validateTwitchStremaersThread = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateTwitchStreamers()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, wait_1.wait)(this.TWITCH_THREAD_TIMEOUT)];
                    case 2:
                        _a.sent();
                        this.validateTwitchStremaersThread();
                        return [2 /*return*/];
                }
            });
        });
    };
    Core.prototype.validateTwitchStreamers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, streamer, live;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < this.streamers.length)) return [3 /*break*/, 4];
                        streamer = this.streamers[index];
                        if (!(streamer.platform === "TWITCH")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.twitchScrapper.verifyChannel(streamer.channelName)];
                    case 2:
                        live = (_a.sent()).live;
                        streamer = __assign(__assign({}, streamer), { live: live });
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Core;
}());
exports.Core = Core;