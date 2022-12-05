import React, { useEffect, useState } from 'react';
import { push } from '../../../utils/navigation';
import { Circle } from '../circle';
import { streamer, streamers } from "./@types";

export function SideMenu() {

    const[streamers, setStreamers] = useState<streamers>([]);

    function sortStreamers(a: streamer, b: streamer) {

        if (!a.live && b.live) return 1;

        if (a.live && !b.live) return -1;

        return 0;
    }

    async function getStreamers() {

        const response = await fetch("/getStreamers", { method: "GET" });
        const data = await response.json() as streamers;

        const sorted = data.sort(sortStreamers);

        setStreamers(sorted);
    }

    function selectStreamerHandle(streamer: streamer) {

        push(`?channelName=${streamer.channelName}&platform=${streamer.platform}`);
    }

    useEffect(() => {

        getStreamers();

    }, []);

    return(
        <div
            className="w-[280px] h-full bg-[#1f1f23] flex flex-col justify-start items-start"
        >

            <div
                className="w-full flex justify-start items-start px-[12px] py-[12px]"
            >
                <p
                    className="text-[12px] text-[#FFFFFF] font-[700]"
                >
                    CANAIS MAIS ASSISTIDOS
                </p>
            </div>

            <div
                className="w-full flex flex-col justify-start items-start"
            >

                {streamers.map((streamer, index) => {

                    const containerClassName = streamer.live
                        ? "w-full h-[50px] flex flex-row justify-start items-center px-[10px] hover:bg-[#26262c] cursor-pointer"
                        : "w-full h-[50px] flex flex-row justify-start items-center px-[10px] hover:bg-[#26262c] cursor-pointer opacity-[0.5]"

                    return(
                        <div
                            key={streamer.id}
                            className={containerClassName}
                            onClick={() => selectStreamerHandle(streamer)}
                        >
                            

                            <div
                                className="w-[32px] h-[32px] bg-[#080808] rounded-full"


                                style={{
                                    backgroundImage: `url('${streamer.avatar}')`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                            />

                            <div
                                className="w-[100px] max-w-[100px] flex flex-col justify-start items-start"
                            >

                                <p
                                    className="text-[14px] text-[#FAFAFA] font-[700] pl-[5px] select-none"
                                >
                                    {streamer.channelName}
                                </p>

                                <p
                                    className="text-[12px] text-[#FAFAFA] font-[400] pl-[5px] select-none"
                                >
                                    {streamer.platform}
                                </p>
                                
                            </div>

                            <div
                                className="w-[calc(100%-132px)] h-full max-w-[calc(100%-132px)] flex flex-row justify-end items-center"
                            >

                                
                                {streamer.live &&
                                
                                    <Circle 
                                    
                                        radius={10}
                                        color="#ff6347"
                                    />
                                }
                                
                                <p
                                    className="text-[14px] text-[#FAFAFA] pl-[5px]"
                                >
                                    {streamer.live ? "Online" : "Offline"}
                                </p>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}