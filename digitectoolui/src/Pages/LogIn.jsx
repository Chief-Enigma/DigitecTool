import React, { useState } from "react";
import "./LogIn/LogIn.css";
import ClientApi from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 3) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    const AuthenticationResult = await ClientApi.login({
      LoginEmail: email,
      LoginPassword: password,
    });
    try {
      if (AuthenticationResult.statusCode === 200) {
        console.log(AuthenticationResult);
        console.log("logged in!!!");

        localStorage.setItem(
          "user",
          JSON.stringify({
            personalnumber:
              AuthenticationResult.returnCredentials.personalNumber,
            userrole: AuthenticationResult.returnCredentials.userRole,
          })
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
      }
    } catch (error) {
      console.log("Something went horrible wrong!!!" + error);
    }
  };

  if (props.loggedIn) {
    return <Navigate replace to="/Account" />;
  }

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
          <label className="label" htmlFor="email">
            E-Mail Adresse
          </label>
          <label className="errorLabel">{emailError}</label>
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
          <label className="label" htmlFor="password">
            Passwort
          </label>
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <button className="LoginButton" onClick={handleLogin}>
          Log In!
        </button>
      </div>
    </div>
  );
};
