import React from "react";
import { Link } from "react-router-dom";

export const Worker = ({ worker }) => {
  const shouldShowJob = !["F", "K", "KR", "-"].includes(worker.job);

  const getAbbreviation = (text) => {
    return text
      .split(' ')
      .map((word) => word[0])
      .join('');
  };

  const abbreviatedRole = getAbbreviation(worker.role);

  return (
    <tr className="worker">
      <td>
        <Link
          to={`/personalshiftplan/${worker.name.replace(/ /g, "-")}`}
          className="name"
        >
          <span>{worker.name}</span>
        </Link>
        <span className="role"> {abbreviatedRole}</span>
        <span className="shift"> = {worker.shift}</span>
        {shouldShowJob && <span className="job">{worker.job}</span>}
      </td>
    </tr>
  );
};
