import React from "react";
import "./Home/Home.css";

export const Home = (props) =>{

    if(props.loggedIn){
        return(
            <p>LoggedIn yeah! Your personumber is {props.personalnumber}</p>
        );
    }else{
        return(
            <p>Nope, pls login</p>
        );
    }
}