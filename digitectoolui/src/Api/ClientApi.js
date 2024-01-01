class ClientApi {
  constructor() {
    this.baseURL = "https://api.hackster.ch/api/";
    //this.baseURL = "http://localhost:5089/api/";
  }

  request = async (url, method, data) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Got response successfully");
      return await response.json();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  async login(data) {
    const url = this.baseURL + "Authentication";
    try {
      return await this.request(url, "POST", data);
    } catch (error) {
      console.error("Error at login: ", error);
    }
  }

  async GetAllEmployees() {
    const url = this.baseURL + "Employee/all";
    try {
      return await this.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetAllEmployees: ", error);
    }
  }

  async AddEmployee(data) {
    const url = this.baseURL + "Employee";
    try {
      return await this.request(url, "POST", data);
    } catch (error) {
      console.error("Error at AddEmployee: ", error);
    }
  }
}

export default new ClientApi();
