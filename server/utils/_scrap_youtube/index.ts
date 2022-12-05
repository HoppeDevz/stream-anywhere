import puppeteer, { Browser } from 'puppeteer';

import { YoutubeScrapChannelStatus } from './@types';

import { wait } from '../../helpers/wait';

export class YoutubeScrapper {
    
    private browser: Browser | undefined;

    constructor() {

        puppeteer.launch({ headless: false }).then(browser => this.browser = browser);
    }

    public async verifyChannel(channelUserName: string): Promise<YoutubeScrapChannelStatus> {

        if (!this.browser) return { live: false, href: "" };

        console.log(`[YOUTUBE-SCRAP] - VERIFYING CHANNEL ${channelUserName}...`);

        try {

            const url = `https://www.youtube.com/@${channelUserName}/featured`;

            const browser = this.browser;
            const page = await browser.newPage();

            await page.goto(url);
            await wait(3500);

            const liveURL = await page.evaluate(() => {

                let liveURL = "";
                const thumbs = document.querySelectorAll("#thumbnail");

                thumbs.forEach(thumb => {

                    if (thumb.querySelector("ytd-thumbnail-overlay-time-status-renderer[overlay-style=LIVE]")) {

                        const href = thumb.getAttribute("href");
                        if (href) liveURL = href;
                    }
                });
                
                return Promise.resolve(liveURL);
            });

            await page.close();

            if (liveURL !== "") return { live: true, href: liveURL };

            return { live: false, href: "" };

        } catch(err) {

            console.log(err);
            throw err;
        }
    }
}