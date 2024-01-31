import React, { useEffect, useState } from "react";

import "./HomeComponents/HomeMainStyles.css";

import Get from "../../Functions/Api/Requests/Get"

export const HomeMain = ({ user }) => {
  const [employee, setEmployee] = useState({})

  useEffect(() => {
    const getEmployeeData = async () => {
      const response = await Get.GetEmployeeByPersonalNumber(user.personalnumber);
      console.log(response)
      setEmployee(response);
    };
    getEmployeeData();
    console.log("Geting Emplyee");
  }, []);

  return (
    <div className="HomeElementsContainer">
      <div className="HomeElement GoodMorning">
        <h2>Guten Morgen {employee.firstName}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sunt sit dolor, repudiandae labore architecto deleniti ducimus suscipit obcaecati perspiciatis?</p>
      </div>
      <div className="HomeElement GoodMorning2">
        <h2>Guten Morgen {employee.firstName}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sunt sit dolor, repudiandae labore architecto deleniti ducimus suscipit obcaecati perspiciatis?</p>
      </div>
      <div className="HomeElement GoodMorning3">
        <h2>Guten Morgen {employee.firstName}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sunt sit dolor, repudiandae labore architecto deleniti ducimus suscipit obcaecati perspiciatis?</p>
      </div>
      <div className="HomeElement GoodMorning4">
        <h2>Guten Morgen {employee.firstName}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sunt sit dolor, repudiandae labore architecto deleniti ducimus suscipit obcaecati perspiciatis?</p>
      </div>
      <div className="HomeElement GoodMorning5">
        <h2>Guten Morgen {employee.firstName}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sunt sit dolor, repudiandae labore architecto deleniti ducimus suscipit obcaecati perspiciatis?</p>
      </div>
      <div className="HomeElement GoodMorning6">
        <h2>Guten Morgen {employee.firstName}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sunt sit dolor, repudiandae labore architecto deleniti ducimus suscipit obcaecati perspiciatis?</p>
      </div>
    </div>
  );
};
