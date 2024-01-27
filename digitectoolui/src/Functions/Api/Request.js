class ApiRequest {
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
}

// Create an instance of the ApiRequest class
const apiRequestInstance = new ApiRequest();

// Export the instance as the default module export
export default apiRequestInstance;
