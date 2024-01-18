import React, { useState } from "react";

const JobTypes = [
  "A",
  "A-TS",
  "A-WE",
  "A-AKL",
  "B",
  "SR",
  "SH-W",
  "W",
  "TD",
  "F",
  "K",
  "KR",
  "-",
];

export const PlanSettings = ({ onSelectJobType }) => {
  const [selectedJobType, setSelectedJobType] = useState(null);

  const handleJobTypeClick = (jobType) => {
    setSelectedJobType(jobType);
    onSelectJobType(jobType);
  };
  return (
    <div className="PlanSettings">
      {JobTypes.map((type) => (
        <label
          key={type}
          className={`JobTypeLabel ${
            selectedJobType === type ? "SelectedJobType" : ""
          }`}
          onClick={() => handleJobTypeClick(type)}
        >
          {type}
        </label>
      ))}
    </div>
  );
};
