import React, { useEffect, useState } from "react";
import "./HomeComponents/HomeMainStyles.css";
import Get from "../../Functions/Api/Requests/Get";

export const HomeMain = ({ user }) => {
  const [employee, setEmployee] = useState({});
  const [greeting, setGreeting] = useState("Guten Morgen");

  useEffect(() => {
    const getEmployeeData = async () => {
      const response = await Get.GetEmployeeByPersonalNumber(user.personalnumber);
      setEmployee(response);
    };

    getEmployeeData();

    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Guten Morgen");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Guten Tag");
    } else {
      setGreeting("Guten Abend");
    }
  }, []);

  return (
    <div className="HomeElementsContainer">
      <div className="HomeElement GoodMorning">
        <h2>{greeting} {employee.firstName}</h2>
      </div>
    </div>
  );
};
