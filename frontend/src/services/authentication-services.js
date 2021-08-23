import axios from "axios";
import { baseAPIURL } from '../config/index';

class AuthenticationService {
  isLoggedIn = false;

  getAuthorizationClient = () => axios.create(
    {
      headers: {
        Authorization: `bearer ${sessionStorage.getItem('token')}`
      }
    })

  login = (username, password) => {
    return axios
      .get(`${baseAPIURL}/user/authentication`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((respone) => {
        const token = respone.headers["authorization"];
        sessionStorage.setItem("token", token);
        if (token) {
          sessionStorage.setItem("user", JSON.stringify(respone.data));
          this.isLoggedIn = true;
        }
        return respone;
      });
  };

  logout = () => {
    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('token') != null){
        sessionStorage.clear();
        this.isLoggedIn = false;
        return resolve(true);
      }
      return reject(true);
    })
  }
}

export default new AuthenticationService();
