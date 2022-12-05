import puppeteer, { Browser } from "puppeteer";
import { wait } from "../../helpers/wait";

export class TwitchScrapper {

    private browser: Browser | undefined;

    constructor() {

        puppeteer.launch({ headless: true }).then(browser => this.browser = browser);
    }

    public async verifyChannel(channelUserName: string): Promise<{ live: boolean, avatar: string }> {

        if (!this.browser) return { live: false, avatar: "" };

        console.log(`[TWITCH-SCRAP] - VERIFYING CHANNEL ${channelUserName}...`);

        try {

            const url = `https://twitch.tv/${channelUserName}`;

            const browser = this.browser;
            const page = await browser.newPage();

            await page.goto(url);
            await wait(3500);

            const { live, avatar } = await page.evaluate((channelUserName) => {

                let live = false;
                let avatar = "";

                const liveIndicator = document.querySelector(".live-indicator-container");
                const avatarElement = document.querySelector(`.tw-image-avatar[alt=${channelUserName}]`);

                if (avatarElement) {

                    const avatarSrc = avatarElement.getAttribute("src");

                    if (avatarSrc) avatar = avatarSrc;
                } 

                if (liveIndicator) live = true;

                return Promise.resolve({ live, avatar });
                
            }, channelUserName);

            await page.close();

            console.log(`[TWITCH-SCRAP] - CHANNEL - ${channelUserName} | LIVE: ${live ? "YES" : "NO"}...`);

            return { live, avatar };

        } catch(err) {

            console.log(err);
            throw err;
        }
    }
}