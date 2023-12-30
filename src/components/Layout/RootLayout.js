import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const RootLayout = (props)=>{
    return(
        <React.Fragment>
            <Header/>
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    );
}

export default RootLayout;