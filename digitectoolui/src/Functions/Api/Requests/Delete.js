import ApiRequest from "../Request";

class Delete {
  async DeleteTicket(data) {
    const url = ApiRequest.baseURL + "Ticket/delete/" + data;
    try {
      return await ApiRequest.request(url, "DELETE", undefined);
    } catch (error) {
      console.log("Error at DeleteTicket: " + error);
    }
  }
}

const DeleteRequest = new Delete();

export default DeleteRequest;
