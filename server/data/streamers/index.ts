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
    }
]

export const getStreamers = (): Promise<streamers> => {

    return new Promise(resolve => resolve(stramers))
}