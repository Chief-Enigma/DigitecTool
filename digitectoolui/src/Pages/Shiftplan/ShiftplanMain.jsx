import React, { useEffect } from "react";
import Get from "../../Functions/Api/Requests/Get";

export const ShiftLayouts = [
  { shiftID: "FS", shiftname: "Frühschicht", backgroundcolor: "#de1f43" },
  { shiftID: "SS", shiftname: "Spätschicht", backgroundcolor: "#99C68E" },
  { shiftID: "NS", shiftname: "Nachtschicht", backgroundcolor: "#46C7C7" },
  { shiftID: "W", shiftname: "Wartung", backgroundcolor: "#1F85DE" },
  { shiftID: "TD", shiftname: "Büro", backgroundcolor: "#999966" },
  { shiftID: "A", shiftname: "Abwesend", backgroundcolor: "#ffffff" },
  // { shiftID: "-", shiftname: "Abwesend", backgroundcolor: "#ffffff" }
];


export const ShiftplanMain = () => {

  const getShifts = async () => {
    const response = await Get.GetShiftPlanForMonth();
    console.log(response)
  }

  useEffect(() => {
getShifts();
  }, [])

  return (
    <p>Moin</p>
  );
};
