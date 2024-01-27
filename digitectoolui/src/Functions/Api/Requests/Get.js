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

  // Get all Employees from a Team
  async GetAllEmployeesByTeam(team) {
    const url = ApiRequest.baseURL + "Employee/team/" + team;
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetAllEmployeesByTeam: ", error);
    }
  }

  // Get single Employee by Personalnumber
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
  async GetShiftPlanForMonth(month) {
    const url = ApiRequest.baseURL + "Shift/getplan/" + month;
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetShiftPlanForMonth: ", error);
    }
  }

  // Get all Ticket Props
  async GetAllTickets(ticketstate) {
    const url = ApiRequest.baseURL + "Ticket/all/" + ticketstate;
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetAllTickets: ", error);
    }
  }

  // Get Tickettext by Ticketnumber
  async GetTicket(ticketNumber) {
    const url = ApiRequest.baseURL + "Ticket/ticket/" + ticketNumber;
    try {
      return await ApiRequest.request(url, "GET", undefined);
    } catch (error) {
      console.error("Error at GetTicketText: ", error);
    }
  }
}

const GetRequest = new Get();

export default GetRequest;
