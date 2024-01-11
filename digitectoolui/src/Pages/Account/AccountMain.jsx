import React from "react";

export const AccountMain = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div  className="middlediv">
      <div className="LoginContainer">
        <div style={{textAlign: 'center'}} className="InputContainer">
        <button className="LoginButton" onClick={handleLogout}>
          Log Out!
        </button>
        </div>
      </div>
    </div>
  );
};
