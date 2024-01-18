// import React, { useState, useEffect } from "react";
// import Put from "../../../../Functions/Api/Requests/Put";

// const getShiftColor = (shift) => {
//   switch (shift) {
//     case "FS":
//       return `rgba(222, 31, 67, 0.3)`;
//     case "SS":
//       return "rgba(153, 198, 142, 0.3)";
//     case "TD":
//       return "rgba(153, 153, 102, 0.3)";
//     default:
//       return "";
//   }
// };

// export const EmployeeShiftRow = (
//   { Shifts, Employee, Days },
//   selectedJobType
// ) => {
//   return (
//     <tr key={Employee.personalNumber}>
//       <td
//         className="NameLabel"
//         key={Employee.personalNumber + Employee.firstName}
//       >{`${Employee.firstName} ${Employee.lastName}`}</td>
//       {Days.map((day) => {
//         const shiftDay = Shifts.find((shift) => shift.shiftDate === day.date);
//         return (
//           <td
//             key={day.date + Employee.personalNumber}
//             className="ShiftDayLabel"
//             style={{
//               backgroundColor: getShiftColor(shiftDay.shift),
//             }}
//             onClick={() => {
//               if (selectedJobType) {
//                 if (shiftDay) {
//                   shiftDay.job = selectedJobType;
//                 }
//               }
//             }}
//           >
//             {shiftDay && shiftDay.job !== "" ? shiftDay.job : "-"}
//           </td>
//         );
//       })}
//     </tr>
//   );
// };

