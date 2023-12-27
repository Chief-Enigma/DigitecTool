class ClientApi {
  constructor() {
    this.baseURL = "https://digitec.hackster.ch/api/";
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
      // Handle any errors that occurred during the request
      console.error("Login error:", error);
    }
  }
}

export default new ClientApi();