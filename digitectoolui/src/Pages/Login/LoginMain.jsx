import React, { useState } from "react";
import Post from "../../Functions/Api/Requests/Post";
import { useNavigate } from "react-router-dom";
import "./LoginComponents/LoginMain.css";
import background from "../../Pictures/DigitecWallpaper.jpg"

export const LoginMain = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    const AuthenticationResult = await Post.auth({
      LoginEmail: email.toLowerCase(),
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
            email: AuthenticationResult.returnCredentials.email,
            userrole: AuthenticationResult.returnCredentials.userRole,
            permissions: AuthenticationResult.returnCredentials.permissions,
          })
        );

        //return <Navigate to="/" />;
        navigate("/");
      } else if (AuthenticationResult.statusCode === 401) {
        console.log("Nope " + AuthenticationResult.exMessage);
      }
    } catch (error) {
      console.log("Something went horrible wrong!!!" + error);
    }
  };

  return (
    <div className="middlediv" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: '100%',
        position: 'absolute',
        width: '100%',
        filter: 'brightness(0.5)',
        backgroundAttachment: 'fixed', // Dieses Attribut fügt das Hintergrundbild an
        zIndex: -1 // Hintergrundbild unter anderen Elementen platzieren
      }}></div>
      <div className="LoginContainer">
        <div className="InputContainer">
          <input
            className="input"
            type="email"
            id="email"
            required
            value={email}
            onChange={handleEmailChange}
            placeholder="E-Mail Adresse"
          />
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            placeholder="Passwort"
          />

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
