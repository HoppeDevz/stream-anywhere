export interface twitchStreamer {

    id: number
    channelName: string
    platform: "TWITCH"

    live: boolean
    avatar: string
}

export interface youtubeStreamer {

    id: number
    channelName: string
    
    platform: "YOUTUBE"

    live: boolean
    href: string
    avatar: string
}

export type streamer = (twitchStreamer | youtubeStreamer)

export type streamers = streamer[];