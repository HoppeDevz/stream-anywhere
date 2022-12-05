import React from "react";
import { Header } from "../../_atoms/header";
import { RightContainer } from "../../_atoms/right_container";
import { SideMenu } from "../../_atoms/side_menu";

export function Home() {

    return(
        <React.Fragment>

            <Header />


            <div
                className="w-screen h-[calc(100vh-50px)] flex flex-row justify-start items-start bg-[#0e0e10]"
            >

                <SideMenu />
                <RightContainer />
            </div>

        </React.Fragment>
    )
}