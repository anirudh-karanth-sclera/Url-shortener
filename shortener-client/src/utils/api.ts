import axios from "axios";

const API = axios.create({
  baseURL: "https://shortener-backend-dkho.onrender.com",
});

export default API;
