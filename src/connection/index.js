import axios from "axios";

const porta =
  process.env.REACT_APP_API_URL || "https://jay-assistant-api.herokuapp.com/";

const api = axios.create({
  baseURL: porta,
});

export default api;
