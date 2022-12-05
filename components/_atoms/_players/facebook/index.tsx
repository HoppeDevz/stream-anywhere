
export type FacebookPlayerProps = {

    width: string 
    height: string

    channelName: string
    frameBorder?: string
    allowFullScreen?: boolean
    scrolling?: "yes" | "no"
}

export function FacebookPlayer({ channelName, ...props}: FacebookPlayerProps) {

    const frameBorder = props.frameBorder ?? "0";
    const allowFullScreen = props.allowFullScreen ?? true;
    const scrolling = props.scrolling ?? "no";

    return(
        <iframe
            src={`https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F${channelName}%2Fvideos%2F914445346128123%2F&show_text=false&width=560&t=0`}
            
            // style="border:none;overflow:hidden" 

            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 

            scrolling={scrolling}
            frameBorder={frameBorder}
            allowFullScreen={allowFullScreen}

            {...props}
        ></iframe>
    )
}