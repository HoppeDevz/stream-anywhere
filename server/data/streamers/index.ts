import type { streamers } from "./@types";

export const stramers: streamers = [
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
]

export const getStreamers = (): Promise<streamers> => {

    return new Promise(resolve => resolve(stramers))
}