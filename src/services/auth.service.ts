import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  // Login and save JWT to local storage
  async login(email: string, password: string) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  // Remove JWT token from local storage
  logout() {
    localStorage.removeItem("user");
  }

  register(
    firstName: string,
    lastName: string,
    alias: string,
    email: string,
    phone: number,
    password: string
  ) {
    return axios.post(API_URL + "signup", {
      firstName,
      lastName,
      alias,
      email,
      phone,
      password,
    });
  }

  // Get stored user information with JWT
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
