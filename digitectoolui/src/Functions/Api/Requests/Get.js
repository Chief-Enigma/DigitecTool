import ApiRequest from "../Request";

class Get {
  // Get all Employees
  async GetAllEmployees() {
    const url = ApiRequest.baseURL + "Employee/all";
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetAllEmployees: ", error);
    }
  }

  async GetAllEmployeesByTeam(team) {
    const url = ApiRequest.baseURL + "Employee/team/" + team;
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetAllEmployeesByTeam: ", error);
    }
  }

  async GetEmployeeByPersonalNumber(id) {
    const url = ApiRequest.baseURL + "Employee/" + id;
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetEmployeeByPersonalNumber: ", error);
    }
  }

  // Get all Users
  async GetAllUsers() {
    const url = ApiRequest.baseURL + "Login/all";
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetAllUsers: ", error);
    }
  }

  // Get MonthPlan
  async GetShiftPlanForMonth() {
    const url = ApiRequest.baseURL + "Shift/currentmonth";
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetShiftPlanForMonth: ", error);
    }
  }
}

const GetRequest = new Get();

export default GetRequest;