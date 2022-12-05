import React, { useEffect } from 'react';
import Script from 'next/script';

import { FacebookPlayer } from '../components/_players/facebook'
import { TwitchPlayer } from '../components/_players/twitch'


export default function Home() {

  useEffect(() => {

    const interval = setInterval(() => {

      if (typeof window !== "undefined") {

        fetch("/getStreamers", { method: "GET" })
        .then(response => response.json())
        .then(data => console.log(data));
      }

    }, 5 * 1000)
    
    return () => { clearInterval(interval) }

  }, []);

  return (
    <React.Fragment>

      {/* <TwitchPlayer 

        width='1280'
        height='720'

        channelName='xqc'
      /> */}

      {/* <FacebookPlayer 

        width='1280'
        height='720'

        channelName="n4noFPS"
      /> */}

      <Script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2" />

    </React.Fragment>
  )
}
