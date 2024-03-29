import React from "react";
import { Link } from "react-router-dom";
import Post from "../../../../Functions/Api/Requests/Post";

export const EmployeeRow = ({ employee, expanded, toggleRow }) => {
  const handleGenerateLogin = async () => {
    await Post.AddLogin(employee.personalNumber);
  };
  return (
    <>
      <tr className={`EmployeeRow ${expanded ? "open" : ""}`}>
        <td>
          {employee.firstName} {employee.lastName}
        </td>
        <td className="non-mobile">{employee.workerRole}</td>
        <td className="non-mobile">Team: {employee.team}</td>
        <td>{employee.personalNumber}</td>
        <td>
          <Link
            className="EmployeeLink"
            onClick={() => toggleRow(employee.personalNumber)}
          >
            <span className="toggleicon material-symbols-outlined">expand_more</span>
          </Link>
        </td>
      </tr>
      {expanded && (
        <tr className="ExpandedRow">
          <td colSpan="5">
            {/* Render additional employee information and buttons here */}
            <div className={`EmployeeDataContainer ${expanded ? "open" : ""}`}>
              <button>Edit</button>
              <button>Save</button>
              <button>Discard</button>
              <button>Delete</button>
              <button onClick={handleGenerateLogin}>Generate Login</button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
