import React from 'react';
import Script from 'next/script';

import { FacebookPlayer } from '../components/_players/facebook'
import { TwitchPlayer } from '../components/_players/twitch'


export default function Home() {
  return (
    <React.Fragment>

      {/* <TwitchPlayer 

        width='1280'
        height='720'

        channelName='xqc'
      /> */}

      <FacebookPlayer 

        width='1280'
        height='720'

        channelName="n4noFPS"
      />

      <Script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2" />

    </React.Fragment>
  )
}
