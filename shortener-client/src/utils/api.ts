import axios from "axios";

const API = axios.create({
  // baseURL: "https://shortener-backend-dkho.onrender.com",
  baseURL:"http://localhost:8080"
});

export default API;
