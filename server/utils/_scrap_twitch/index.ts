import puppeteer, { Browser } from "puppeteer";
import { wait } from "../../helpers/wait";

export class TwitchScrapper {

    private browser: Browser | undefined;

    constructor() {

        puppeteer.launch({ headless: false }).then(browser => this.browser = browser);
    }

    public async verifyChannel(channelUserName: string): Promise<{ live: boolean }> {

        if (!this.browser) return { live: false };

        console.log(`[TWITCH-SCRAP] - VERIFYING CHANNEL ${channelUserName}...`);

        try {

            const url = `https://twitch.tv/${channelUserName}`;

            const browser = this.browser;
            const page = await browser.newPage();

            await page.goto(url);
            await wait(3500);

            const live = await page.evaluate(() => {

                const liveIndicator = document.querySelector(".live-indicator-container");

                if (liveIndicator) return Promise.resolve(true);

                return Promise.resolve(false);
            });

            await page.close();

            console.log(`[TWITCH-SCRAP] - CHANNEL - ${channelUserName} | LIVE: ${live ? "YES" : "NO"}...`);

            return { live };

        } catch(err) {

            console.log(err);
            throw err;
        }
    }
}