"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreamers = exports.stramers = void 0;
exports.stramers = [
    {
        id: 0,
        channelName: "xqc",
        platform: "TWITCH",
        live: false
    },
    {
        id: 1,
        channelName: "Swagg",
        avatar: "",
        platform: "YOUTUBE",
        live: false,
        href: ""
    },
    {
        id: 2,
        channelName: "summit1g",
        platform: "TWITCH",
        live: false
    },
    {
        id: 3,
        channelName: "shroud",
        platform: "TWITCH",
        live: false
    },
    {
        id: 4,
        channelName: "tecnosh",
        platform: "TWITCH",
        live: false
    }
];
var getStreamers = function () {
    return new Promise(function (resolve) { return resolve(exports.stramers); });
};
exports.getStreamers = getStreamers;
