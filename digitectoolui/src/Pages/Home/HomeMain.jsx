import React from "react";

export const HomeMain = ({ user }) => {
  console.log(user);
  return (
    <h1>
      This is HomeMain. Ur user: {user.personalnumber} {user.userrole}
    </h1>
  );
};
