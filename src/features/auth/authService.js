import axios from "axios";
import backend from "../../constants/config";

const AUTH_API_URL = backend.API + "/auth";

const login = async (userData) => {
  const response = await axios.post(AUTH_API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("ctam_user", JSON.stringify(response.data));
  }

  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(AUTH_API_URL + "/register", userData);

  return response.data;
};

const listUsers = async () => {
  const response = await axios.get(AUTH_API_URL + "/users");

  return response.data;
};

const deleteUser = async (id) => {
  await axios.delete(AUTH_API_URL + "/users/" + id);

  return id;
};

const changePassword = async (userData) => {
  const response = await axios.put(AUTH_API_URL + "/change-password", userData);

  return response.data;
};


const logout = () => {
  localStorage.removeItem("ctam_user");
};

const authService = {
  login,
  listUsers,
  deleteUser,
  logout,
  register,
  changePassword
};

export default authService;
