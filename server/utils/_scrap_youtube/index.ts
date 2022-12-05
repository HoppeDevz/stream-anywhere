import puppeteer, { Browser } from 'puppeteer';

import { YoutubeScrapChannelStatus } from './@types';

import { wait } from '../../helpers/wait';

export class YoutubeScrapper {
    
    private browser: Browser | undefined;

    constructor() {

        puppeteer.launch({ headless: true }).then(browser => this.browser = browser);
    }

    public async verifyChannel(channelUserName: string): Promise<YoutubeScrapChannelStatus> {

        if (!this.browser) return { live: false, href: "", avatar: "" };

        console.log(`[YOUTUBE-SCRAP] - VERIFYING CHANNEL ${channelUserName}...`);

        try {

            const url = `https://www.youtube.com/@${channelUserName}/featured`;

            const browser = this.browser;
            const page = await browser.newPage();

            await page.goto(url);
            await wait(3500);

            const { liveURL, avatar } = await page.evaluate(() => {

                let liveURL = "";
                let avatar = "";

                const thumbs = document.querySelectorAll("#thumbnail");
                const avatarElement = document.querySelector("yt-img-shadow img");

                if (avatarElement) {
                    
                    const avatarSrc = avatarElement.getAttribute("src");

                    if (avatarSrc) avatar = avatarSrc;
                }

                thumbs.forEach(thumb => {

                    if (thumb.querySelector("ytd-thumbnail-overlay-time-status-renderer[overlay-style=LIVE]")) {

                        const href = thumb.getAttribute("href");
                        if (href) liveURL = href;
                    }
                });
                
                return Promise.resolve({ liveURL, avatar });
            });

            await page.close();

            console.log(`[YOUTUBE-SCRAP] - CHANNEL - ${channelUserName} | LIVE: ${liveURL !== "" ? "YES" : "NO"}...`);

            if (liveURL !== "") return { live: true, href: liveURL, avatar };

            return { live: false, href: "", avatar };

        } catch(err) {

            console.log(err);
            throw err;
        }
    }
}