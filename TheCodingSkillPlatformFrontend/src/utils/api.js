import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust to your Django backend URL
  withCredentials: true, // Optional if you are using cookies/sessions
});

export default API;
