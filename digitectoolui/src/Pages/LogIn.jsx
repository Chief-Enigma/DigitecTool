import React, { useState } from "react";
import "./LogIn/LogIn.css";
import ClientApi from "../Api/Api";
import { useNavigate } from "react-router-dom";

export const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [personalnumber, setPersonalNumber] = useState("");
  const [userrole, setUserRole] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const AuthenticationResult = await ClientApi.login({
      LoginEmail: email,
      LoginPassword: password,
    });
    if (AuthenticationResult.statusCode === 200) {
      console.log(AuthenticationResult);
      console.log("logged in!!!");

      /* 
      FIX THE ERROR THAT LOGGEDIN IS SAVED BUT NOT THE PERSONAL NUMBER AND THE USER ROLE!!!
      */
      setPersonalNumber(AuthenticationResult.returnCredentials.personalNumber);
      localStorage.setItem(
        "user",
        JSON.stringify({ personalnumber, userrole })
      );

      props.setPersonalNumber(
        AuthenticationResult.returnCredentials.personalNumber
      );
      props.setUserRole(AuthenticationResult.returnCredentials.userRole);
      console.log(AuthenticationResult.returnCredentials.userRole);

      props.setLoggedIn(true);

      navigate("/");
    } else if (AuthenticationResult.statusCode === 401) {
      console.log("Nope " + AuthenticationResult.exMessage);
    } else {
      console.log("Something went horrible wrong!!!");
    }
  };

  return (
    <div className="middlediv">
      <div className="LoginContainer">
        <div className="InputContainer">
          <input
            className="input"
            type="email"
            id="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <label className="label" htmlForfor="email">
            E-Mail Adresse
          </label>
        </div>
        <br />
        <div className="InputContainer">
          <input
            className="input"
            type="password"
            id="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <label className="label" htmlForfor="password">
            Passwort
          </label>
        </div>
        <br />
        <button className="LoginButton" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
};
