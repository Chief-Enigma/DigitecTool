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

  async GetAllEmployeesByTeam(id) {
    const url = ApiRequest.baseURL + "Employee/team/" + id;
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetAllEmployeesByTeam: ", error);
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
}

export default new Get();
