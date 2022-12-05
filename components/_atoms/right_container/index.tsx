import React, { useEffect, useState } from "react"
import { SIDE_MENU_WIDTH } from "../../../constants";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { TwitchPlayer } from "../_players/twitch";
import { platforms } from "./@types";


export function RightContainer() {

    const viewport = useWindowSize();

    const[channelName, setChannelName] = useState("");
    const[platform, setPlatform] = useState<platforms | "">("");

    useQueryParams(() => {

        const url = new URL(window.location.href);
        const search = new URLSearchParams(url.search);

        const channelName = search.get("channelName") ?? "";
        const platform = search.get("platform") ?? "";

        setChannelName(channelName);

        if (platform === "TWITCH" || platform === "YOUTUBE")
            setPlatform(platform);

    }, [], { triggerOnMountComponent: true });

    return(
        <div
            className="w-full h-full bg-[transparent]"
        >

            {platform === "TWITCH" && channelName !== "" &&

                <React.Fragment>

                    <TwitchPlayer

                        width={"100%"}
                        height={"80%"}

                        channelName={channelName}
                    />
                </React.Fragment>
            }
        </div>
    )
}