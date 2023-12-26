import React from "react";
import { Navigate } from "react-router-dom";

export const Account = (props) => {
    if(!props.loggedIn){
        return <Navigate replace to="/LogIn" />;
    }

    return(
        <p>Account</p>
    );
};
