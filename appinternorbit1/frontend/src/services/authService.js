import axios from "axios";

const BASE_API_AUTH_URL = "http://127.0.0.1:8000/api/token/";

const login = (credentials) => {
  return axios.post(BASE_API_AUTH_URL, credentials);
};

export default login;
