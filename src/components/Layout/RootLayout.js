import React from "react";
import Header from "./Header";
import Signup from "../Signup/Signup";

const RootLayout = (props)=>{
    return(
        <React.Fragment>
            <Header/>
            <Signup />
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default RootLayout;