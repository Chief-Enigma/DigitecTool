import React, { useState } from "react";
import Post from "../../../../Functions/Api/Requests/Post";

export const EmployeeAddMain = () => {
  const teams = ["Andreas", "Eren", "Zeljko", "Julian"];
  const workerroles = [
    "Junior Maintenance Technician",
    "Maintenance Technician",
    "Shift Manager",
  ];
  const [formData, setFormData] = useState({
    id: {},
    personalnumber: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    email: "",
    phonenumber: "",
    team: "",
    workerrole: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      workerrole:
        prevData.workerrole === "custom" ? value : prevData.workerrole,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const AuthenticationResult = await Post.AddEmployee(formData);
    console.log(AuthenticationResult);
  };

  const handleAbort = (e) => {
    e.preventDefault();
    setFormData({
      personalnumber: "",
      firstname: "",
      lastname: "",
      birthdate: "",
      email: "",
      phonenumber: "",
      team: "",
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
          <option value="" disabled>
            Team wählen
          </option>
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
          <option value="" disabled>
            Funktion wählen oder eigene erstellen
          </option>
          {workerroles.map((workerrole) => (
            <option key={workerrole} value={workerrole}>
              {workerrole}
            </option>
          ))}
          <option value="custom">Eigene</option>
        </select>
        <label className="AddLabel" htmlFor="workerrole">
          Position
        </label>
        {formData.workerrole === "custom" && (
          <input
            type="text"
            name="customWorkerRole"
            id="customWorkerRole"
            value={formData.customWorkerRole}
            onChange={handleChange}
            placeholder="Eigene Funktion eingeben"
          />
        )}
      </div>
      <div className="DataContainer">
        <button type="submit" onClick={handleSubmit}>
          <span className="material-symbols-outlined">done</span>
        </button>
        <button type="submit" onClick={handleAbort}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </form>
  );
};
