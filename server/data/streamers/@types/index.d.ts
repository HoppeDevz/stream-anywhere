export interface twitchStreamer {

    id: number
    channelName: string
    platform: "TWITCH"

    live: boolean
}

export interface youtubeStreamer {

    id: number
    channelName: string
    avatar: string

    platform: "YOUTUBE"

    live: boolean
    href: string
}

export type streamers = (twitchStreamer | youtubeStreamer)[];