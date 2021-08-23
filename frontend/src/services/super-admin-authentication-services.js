import axios from "axios";
import { baseAPIURL } from '../config/index';

class SuperAdminAuthenticationService {
  isLoggedIn = false;

  getAuthorizationClient = () => axios.create(
    {
      headers: {
        Authorization: `bearer ${sessionStorage.getItem('admin')}`
      }
    })

  login = (username, password) => {
    return axios
      .get(`${baseAPIURL}/admin/authentication`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((respone) => {
        const token = respone.headers["authorization"];
        sessionStorage.setItem("admin", token);
        if (token) {
          sessionStorage.setItem("admin-user", JSON.stringify(respone.data));
          this.isLoggedIn = true;
        }
        return respone;
      });
  };

  logout = () => {
    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('admin') != null){
        sessionStorage.clear();
        this.isLoggedIn = false;
        return resolve(true);
      }
      return reject(true);
    })
  }
}

export default new SuperAdminAuthenticationService();
