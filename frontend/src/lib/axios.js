import axios from "axios";

//In order for the URL to be dynamic depending on the given url of the rendering tool
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;