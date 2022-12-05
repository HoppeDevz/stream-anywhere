import { Request, Response } from "express";
import { getStreamers } from "../../data/streamers";
import { streamers } from "../../data/streamers/@types";
import { wait } from "../../helpers/wait";


// SCRAPPERS
import { TwitchScrapper } from "../_scrap_twitch";
import { YoutubeScrapper } from "../_scrap_youtube";


export class Core {

    private TWITCH_THREAD_TIMEOUT = 5 * 1000;
    private YOUTUBE_THREAD_TIMEOUT = 5 * 1000;

    public streamers: streamers = [];

    private twitchScrapper: TwitchScrapper = new TwitchScrapper();
    private youtubeScrapper: YoutubeScrapper = new YoutubeScrapper();

    constructor() {

        this.getStreamers();

        this.validateYoutubeStreamersThread();
        this.validateTwitchStremaersThread();
    }

    private getStreamers() {

        getStreamers().then(streamers => this.streamers = streamers);
    }

    public getStreamersRoute(req: Request, res: Response<streamers>) {

        res.status(200).send(this.streamers);
    }


    //////////////////////////////// YOUTUBE THREAD ////////////////////////////////
    private async validateYoutubeStreamersThread() {

        await this.validateYoutubeStreamers();

        await wait(this.YOUTUBE_THREAD_TIMEOUT);
        this.validateYoutubeStreamersThread();
    }

    private async validateYoutubeStreamers() {

        for (let index = 0; index < this.streamers.length; index++) {

            let streamer = this.streamers[index];

            if (streamer.platform === "YOUTUBE") {

                const { live, href } = await this.youtubeScrapper.verifyChannel(streamer.channelName);
                streamer = {...streamer, live, href };
            }
        }
    }


    //////////////////////////////// TWITCH THREAD ////////////////////////////////
    private async validateTwitchStremaersThread() {

        await this.validateTwitchStreamers();

        await wait(this.TWITCH_THREAD_TIMEOUT);
        this.validateTwitchStremaersThread();      
    }

    private async validateTwitchStreamers() {

        for (let index = 0; index < this.streamers.length; index++) {

            let streamer = this.streamers[index];

            if (streamer.platform === "TWITCH") {

                const { live } = await this.twitchScrapper.verifyChannel(streamer.channelName);
                streamer = {...streamer, live };
            }

        }
    }

}