import type { streamers } from "./@types";

export const stramers: streamers = [
    {
        id: 0,
        channelName: "xqc",
        platform: "TWITCH",

        live: false
    },

    {
        id: 1,
        channelName: "",
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
]

export const getStreamers = (): Promise<streamers> => {

    return new Promise(resolve => resolve(stramers))
}