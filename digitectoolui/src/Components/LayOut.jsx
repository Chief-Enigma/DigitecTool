import React from "react";
import {Outlet} from "react-router-dom";
import {NavBar} from "./NavBar"

export const Layout = (props) => {
    return (
        <>
            <NavBar loggedIn={props.loggedIn} adminloggedIn={props.adminloggedIn}/>
            <Outlet />
        </>
    );
};