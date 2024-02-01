import React, { useEffect, useState } from "react";
import "./HomeComponents/HomeMainStyles.css";
import Get from "../../Functions/Api/Requests/Get";

export const HomeMain = ({ user }) => {
  const [employee, setEmployee] = useState({});
  const [shiftDay, setshiftDay] = useState({});
  const [greeting, setGreeting] = useState("Guten Morgen");

  const fullShiftName = {
    "FS": "Frühschicht",
    "SS": "Spätschicht",
    "TD": "Tagdienst und bist in der BÜÜÜROOOOKRAAATIIIIIE"
  }

  const fullJobText = {
    "A": "bist in Halle A der Joker!",
    "A-TS": "bist in Halle A bei den Turmspeichern untwerwegs.",
    "A-WE": "bist in Halle A im Wareneingang unterwegs.",
    "A-AKL": "bist der RBG Profi! Fall nicht runter!",
    "B": "darfst mit den Shuttels spielen/streiten....",
    "SR": "bist im Space Race unterwegs. Guten Flug!",
    "W": "bist auf Wartung unterwegs, weiter unten findest du Details zur heutigen Wartung.",
    "SH-W": "darfst die Shuttle reparieren",
    "ADM": "bist in der BÜÜÜROOOOKRAAATIIIIIE"
  }

  useEffect(() => {
    const GetEmployeeData = async () => {
      const response = await Get.GetEmployeeByPersonalNumber(user.personalnumber);
      setEmployee(response);
    };

    const GetShiftDay = async () => {
      const shiftResponse = await Get.GetShiftForUser(user.personalnumber);
      setshiftDay(shiftResponse);
    }

    GetEmployeeData();
    GetShiftDay();


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
        <br />
        <p>Du hast heute {fullShiftName[shiftDay.shift]} und {fullJobText[shiftDay.job]}</p>
      </div>
      <div className="HomeElement Reminder">
        <h2>Wichtig!!!</h2>
        <br />
        <p>
          Jungs!<br />
          Heute haben wir das KickOff Meeting mit Andreas und Steve. Bitte kommt alle um 14:00 Uhr in die Werkstatt Halle A.<br />
          Ihr bleibt bitte an eurem Arbeitsplatz bis die Spätschicht da ist damit wir reibungslosen Wechsel haben.<br />
        </p>
      </div>
    </div>
  );
};
