import ApiRequest from "../Request";

class Post {
  // Post login request
  async login(data) {
    const url = ApiRequest.baseURL + "Authentication";
    try {
      return await ApiRequest.request(url, "POST", data);
    } catch (error) {
      console.error("Error at login: ", error);
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
}

export default new Post();
