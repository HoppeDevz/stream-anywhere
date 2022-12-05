import puppeteer, { Browser } from 'puppeteer';
import { YoutubeScrapChannelStatus } from './@types';

export class YoutubeScrap {
    
    private browser: Browser | undefined;

    constructor() {

        puppeteer.launch({ headless: false }).then(browser => this.browser = browser);

        setInterval(() => {

            this.verifyChannel("Swagg");

        }, 5 * 1000);

    }

    public wait(ms: number) {

        return new Promise(resolve => setInterval(resolve, ms));
    }

    public async verifyChannel(channelUserName: string): Promise<YoutubeScrapChannelStatus> {

        if (!this.browser) return { live: false, href: "" };

        console.log(`[YOUTUBE-SCRAP] - VERIFYING CHANNEL ${channelUserName}...`);

        try {

            const url = `https://www.youtube.com/@${channelUserName}/featured`;

            const browser = this.browser;
            const page = await browser.newPage();

            await page.goto(url);
            await this.wait(3500);

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