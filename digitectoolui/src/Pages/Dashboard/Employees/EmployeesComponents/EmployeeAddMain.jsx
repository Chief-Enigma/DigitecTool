import React, { useState } from "react";
import Post from "../../../../Functions/Api/Requests/Post";

export const EmployeeAddMain = () => {
  const teams = ["Julian", "Eren", "Zeljko", "Andreas"];
  const workerroles = [
    "Junior Maintenance Technician",
    "Maintenance Technician",
    "Shift Manager",
  ];
  const [formData, setFormData] = useState({
    personalnumber: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    email: "",
    phonenumber: "",
    team: teams[0], // Default to the first team in the array
    workerrole: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const AuthenticationResult = await Post.AddEmployee(formData);
    console.log(AuthenticationResult);
  };

  const handleAbort = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    setFormData({
      // Reset all form data properties to their initial values
      personalnumber: "",
      firstname: "",
      lastname: "",
      birthdate: "",
      email: "",
      phonenumber: "",
      team: teams[0],
      workerrole: "",
    });
  };

  return (
    <form className="AddEmployeeForm">
      <div className="DataContainer">
        <input
          type="text"
          name="personalnumber"
          id="personalnumber"
          value={formData.personalnumber}
          onChange={handleChange}
        />
        <label className="AddLabel" htmlFor="personalnumber">
          Personalnummer
        </label>
      </div>
      <div className="DataContainer">
        <input
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <label className="AddLabel" htmlFor="firstname">
          Vorname
        </label>
      </div>
      <div className="DataContainer">
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <label className="AddLabel" htmlFor="lastname">
          Nachname
        </label>
      </div>
      <div className="DataContainer">
        <input
          type="date"
          name="birthdate"
          id="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
        <label className="AddLabel" htmlFor="birthdate">
          Geburtsdatum
        </label>
      </div>
      <div className="DataContainer">
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label className="AddLabel" htmlFor="email">
          Email Adresse
        </label>
      </div>
      <div className="DataContainer">
        <input
          type="tel"
          name="phonenumber"
          id="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
        />
        <label className="AddLabel" htmlFor="phonenumber">
          Telefonnummer
        </label>
      </div>
      <div className="DataContainer">
        <select
          name="team"
          id="team"
          value={formData.team}
          onChange={handleChange}
        >
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <label className="AddLabel" htmlFor="team">
          Team
        </label>
      </div>
      <div className="DataContainer">
        <select
          name="workerrole"
          id="workerrole"
          value={formData.workerrole}
          onChange={handleChange}
        >
          {workerroles.map((workerrole) => (
            <option key={workerrole} value={workerrole}>
              {workerrole}
            </option>
          ))}
        </select>
        <label className="AddLabel" htmlFor="workerrole">
          Position
        </label>
      </div>
      <button type="submit" onClick={handleSubmit}>
        <span className="material-symbols-outlined">done</span>
      </button>
      <button type="submit" onClick={handleAbort}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </form>
  );
};
