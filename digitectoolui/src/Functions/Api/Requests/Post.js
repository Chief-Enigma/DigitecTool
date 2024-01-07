import ApiRequest from "../Request";

class Post {
  // Post login request
  async auth(data) {
    const url = ApiRequest.baseURL + "Authentication";
    try {
      return await ApiRequest.request(url, "POST", data);
    } catch (error) {
      console.error("Error at login: ", error);
    }
  }

  // Post new Employee
  async AddLogin(data) {
    const url = ApiRequest.baseURL + "Login";
    try {
      return await ApiRequest.request(url, "POST", data);
    } catch (error) {
      console.error("Error at AddLogin: ", error);
    }
  }

  // Post new Employee
  async AddEmployee(data) {
    const url = ApiRequest.baseURL + "Employee";
    try {
      return await ApiRequest.request(url, "POST", data);
    } catch (error) {
      console.error("Error at AddEmployee: ", error);
    }
  }

  // Post new Shiftmonth
  async GenerateShiftMonth(data) {
    const url = ApiRequest.baseURL + "Shift/newmonth";
    try {
      return await ApiRequest.request(url, "POST", data);
    } catch (error) {
      console.log("Error at GenerateShiftMonth: " + error);
    }
  }
}

export default new Post();
