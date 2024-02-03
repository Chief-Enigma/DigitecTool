import React, { useState, useEffect} from "react";

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedJobType(null);
        onSelectJobType(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSelectJobType]);

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
