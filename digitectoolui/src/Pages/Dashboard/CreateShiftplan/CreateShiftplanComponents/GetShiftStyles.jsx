export const GetShiftStyles = ({ shiftDay }) => {
  const getShiftColor = (shift) => {
    switch (shift) {
      case "FS":
        return {
          backgroundColor: "rgba(255, 41, 41, 0.15)",
          borderColor: "rgba(255, 41, 41, 0.6)",
        };
      case "SS":
        return {
          backgroundColor: "rgba(73, 255, 41, 0.15)",
          borderColor: "rgba(73, 255, 41, 0.6)",
        };
      case "TD":
        return {
          backgroundColor: "rgba(153, 153, 102, 0.15)",
          borderColor: "rgba(153, 153, 102, 0.6)",
        };
      case "K":
        return {
          backgroundColor: "rgba(255, 41, 180, 0)",
          borderColor: "rgba(255, 41, 180, 0.6)",
        };
      case "F":
        return {
          backgroundColor: "rgba(41, 134, 255, 0)",
          borderColor: "rgba(41, 134, 255, 0.6)",
        };
      case "KR":
        return {
          backgroundColor: "rgba(255, 41, 77, 0)",
          borderColor: "rgba(255, 41, 77, 0.6)",
        };
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
        return "rgb(254, 254, 254)";
      case "B":
        return "rgb(254, 254, 254)";
      case "SR":
        return "rgb(254, 254, 254)";
      case "W":
      case "SH-W":
        return "rgb(254, 254, 254)";
      case "TD":
        return "rgb(254, 254, 254)";
      case "F":
        return "rgb(41, 134, 255)";
      case "K":
        return "rgb(255, 41, 180)";
      case "KR":
        return "rgb(255, 41, 77)";
      default:
        return "";
    }
  };

  return {
    backgroundColor: getShiftColor(shiftDay.shift).backgroundColor,
    borderColor: getShiftColor(shiftDay.shift).borderColor,
    color: getJobColor(shiftDay.job),
  };
};
