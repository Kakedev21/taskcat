import axios from "axios";

const API_URL = "/api/users/";

//register
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  //set user in local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  //set user in local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
