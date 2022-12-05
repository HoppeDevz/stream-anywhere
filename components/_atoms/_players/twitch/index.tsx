
export type TwitchPlayerProps = {

    width: string 
    height: string

    channelName: string
    frameBorder?: string
    allowFullScreen?: boolean
    scrolling?: "yes" | "no"

}

export function TwitchPlayer({ channelName, ...props }: TwitchPlayerProps) {

    const frameBorder = props.frameBorder ?? "0";
    const allowFullScreen = props.allowFullScreen ?? true;
    const scrolling = props.scrolling ?? "no";

    return(
        <iframe 
            src={`https://player.twitch.tv/?channel=${channelName}&parent=localhost`}

            frameBorder={frameBorder}
            allowFullScreen={allowFullScreen}
            scrolling={scrolling}

            {...props}
      >
      </iframe>
    )
}