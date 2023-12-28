import React from "react";
import {Outlet} from "react-router-dom";
import {NavBar} from "./NavBar"

export const Layout = (props) => {
    return (
        <>
            <NavBar loggedIn={props.loggedIn} userrole={props.userrole} adminloggedIn={props.adminloggedIn}/>
            <Outlet />
        </>
    );
};