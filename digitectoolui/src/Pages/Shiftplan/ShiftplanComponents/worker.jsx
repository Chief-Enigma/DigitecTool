import React from "react";
import { Link } from "react-router-dom";

export const Worker = ({ worker }) => {
  return (
    <tr className="worker">
      <td>
        <Link
          to={`/personalshiftplan/${worker.name.replace(/ /g, "-")}`}
          className="name"
        >
          <span>{worker.name}</span>
        </Link>
        <span className="role"> {worker.role}</span>
        <span className="shift"> = {worker.shift}</span>
        <span className="job">{worker.job}</span>
      </td>
    </tr>
  );
};
