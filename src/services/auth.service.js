import axios from "axios";
import { API_URL, USER_URL } from "../constants/request";

const register = (registerInfo) => {
  const { email, username, password } = registerInfo;
  return axios.post(USER_URL + "/register", {
    username,
    email,
    password,
  });
};
const login = async (email, password) => {
  return axios
    .post(USER_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.status === 200) {
        document.cookie = `accessToken=${response.data.token}`;
        document.cookie = `userId=${response.data.userId}`;
        return response.data;
      }
      return response.data;
    });
};
const logout = () => {
  //   localStorage.removeItem("user");
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //   return axios.post(API_URL + "signout").then((response) => {
  //     return response.data;
  //   });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
