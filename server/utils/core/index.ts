import { getStreamers } from "../../data/streamers";
import { streamers } from "../../data/streamers/@types";
import { wait } from "../../helpers/wait";

// SCRAPPERS
import { YoutubeScrap } from "../youtube-scrap";


export class Core {

    private streamers: streamers = [];
    private youtubeScrap: YoutubeScrap = new YoutubeScrap();

    constructor() {

        this.getStreamers();

        this.validateYoutubeStreamersThread();
    }

    private getStreamers() {

        getStreamers().then(streamers => this.streamers = streamers);
    }

    private async validateYoutubeStreamersThread() {

        this.validateYoutubeStreamers();

        await wait(60 * 1000);
        this.validateYoutubeStreamersThread();
    }

    private validateYoutubeStreamers() {

        this.streamers.forEach(async (_, index) => {

            let streamer = this.streamers[index];

            if (streamer.platform === "YOUTUBE") {

                const { live, href } = await this.youtubeScrap.verifyChannel(streamer.channelName);
                streamer = {...streamer, live, href };
            }
        });
    }

}