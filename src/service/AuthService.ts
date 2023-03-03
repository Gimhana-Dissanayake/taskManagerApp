import axios from "axios";
import { BASE_URL, LoginCredentials } from "../constants";
import User from "../models/User";

class AuthService {
  setUpAxiosInterceptors(user: User) {
    if (user?.token) {
      let token = this.createJwtToken(user.token);

      axios.interceptors.request.use((config) => {
        if (user && config.headers) {
          config.headers.authorization = token;
        }
        return config;
      });
    }
  }

  createJwtToken(token?: string | null) {
    return "Bearer " + token;
  }

  exectuteJwtAuthenticationService(creds: LoginCredentials) {
    return axios.post(`${BASE_URL}/user/login`, {
      username: creds.username,
      password: creds.password,
    });
  }
}

const obj = new AuthService();

export default obj;
