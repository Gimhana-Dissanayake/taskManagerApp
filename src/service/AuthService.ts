import axios from "axios";
import { AppUser, BASE_URL, LoginCredentials } from "../constants";

class AuthService {
  setUpAxiosInterceptors(user: AppUser) {
    let token = this.createJwtToken(user.token);

    axios.interceptors.request.use((config) => {
      if (user && config.headers) {
        config.headers.authorization = token;
      }
      return config;
    });
  }

  createJwtToken(token?: string | null) {
    return "Bearer " + token;
  }

  exectuteJwtAuthenticationService(creds: LoginCredentials) {
    return axios.post(`${BASE_URL}/authenticate`, {
      username: creds.username,
      password: creds.password,
    });
  }
}

export default new AuthService();
