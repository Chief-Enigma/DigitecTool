import ApiRequest from "../Request";

class Put {
  // Put updated Login Credentials
  async EditLoginCredentials(data, personalnumber) {
    const url = ApiRequest.baseURL + "Login/" + personalnumber;
    try {
      return await ApiRequest.request(url, "PUT", data);
    } catch (error) {
      console.error("Error at EditLoginCredentials: ", error);
    }
  }

  // Post Save Shiftmonth
  async SaveShiftMonth(data) {
    const url = ApiRequest.baseURL + "Shift/savemonth";
    try {
      return await ApiRequest.request(url, "PUT", data);
    } catch (error) {
      console.log("Error at SaveShiftMonth: " + error);
    }
  }

  // Post Save Shiftday
  async SaveShiftDay(data) {
    const url = ApiRequest.baseURL + "Shift/saveday";
    try {
      return await ApiRequest.request(url, "PUT", data);
    } catch (error) {
      console.log("Error at SaveShiftDay: " + error);
    }
  }

  // Get Tickettext by Ticketnumber
  async UpdateTicket(data) {
    const url = ApiRequest.baseURL + "Ticket/update";
    try {
      return await ApiRequest.request(url, "PUT", data);
    } catch (error) {
      console.log("Error at UpdateTicket: " + error);
    }
  }
}

const PutRequest = new Put();

export default PutRequest;
