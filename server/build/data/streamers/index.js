"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreamers = exports.stramers = void 0;
exports.stramers = [
    {
        id: 0,
        channelName: "xQc",
        platform: "TWITCH",
        live: false,
        avatar: ""
    },
    {
        id: 1,
        channelName: "Swagg",
        platform: "YOUTUBE",
        live: false,
        href: "",
        avatar: ""
    },
    {
        id: 2,
        channelName: "summit1g",
        platform: "TWITCH",
        live: false,
        avatar: ""
    },
    {
        id: 3,
        channelName: "shroud",
        platform: "TWITCH",
        live: false,
        avatar: ""
    },
    {
        id: 4,
        channelName: "Tecnosh",
        platform: "TWITCH",
        live: false,
        avatar: ""
    }
];
var getStreamers = function () {
    return new Promise(function (resolve) { return resolve(exports.stramers); });
};
exports.getStreamers = getStreamers;
