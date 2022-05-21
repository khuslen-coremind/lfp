import axios from "axios";
import { API_URL, USER_URL } from "../constants/request";

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
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
    .post(`${USER_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.status === 200) {
        setCookie("accessToken", response.data.token);
        setCookie("userId", response.data.userId);
        return response.data;
      }
      return response.data;
    });
};
const logout = () => {
  //   localStorage.removeItem("user");
  eraseCookie("accessToken");
  eraseCookie("userId");
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
