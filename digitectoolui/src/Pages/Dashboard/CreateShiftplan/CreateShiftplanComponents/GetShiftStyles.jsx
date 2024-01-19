
export const GetShiftStyles = ({ shiftDay }) => {
  const getShiftColor = (shift) => {
    switch (shift) {
      case "FS":
        return `rgba(222, 31, 67, 0.15)`;
      case "SS":
        return `rgba(153, 198, 142, 0.15)`;
      case "TD":
        return `rgba(153, 153, 102, 0.15)`;
      case "K":
        return `rgba(153, 153, 102,0.15)`;
      case "F":
        return `rgba(153, 153, 102, 0.15)`;
      case "KR":
        return `rgba(255, 71, 93, 0.15)`;
      default:
        return "";
    }
  };

  const getJobColor = (job) => {
    switch (job) {
      case "A":
      case "A-AKL":
      case "A-TS":
      case "A-WE":
        return `rgba(235, 28, 28, 1)`;
      case "B":
        return "#29e348";
      case "SR":
        return "#29e444";
      case "W":
      case "SH-W":
        return "#1c7bff";
      case "TD":
        return "#1c7bff";
      case "F":
        return "#1c7bff";
      case "K":
        return "#1c7bff";
      case "KR":
        return `rgba(245, 10, 38, 0.15)`;
      default:
        return "";
    }
  };

  return {
    backgroundColor: `${getShiftColor(shiftDay.shift)}`,
    borderColor: `${getShiftColor(shiftDay.shift)}`,
    color: `${getJobColor(shiftDay.job)}`,
  };
};
