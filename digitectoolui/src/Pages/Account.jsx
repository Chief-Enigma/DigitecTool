import React from "react";
import { Navigate } from "react-router-dom";

export const Account = (props) => {
    if(!props.loggedIn){
        return <Navigate replace to="/LogIn" />;
    }

    const onButtonClick = () => {
          localStorage.removeItem("user")
          props.setLoggedIn(false);
          props.setUserRole("");
          props.setPersonalNumber("");
      }


    return(
        <button onClick={onButtonClick} >Logout</button>
    );
};
