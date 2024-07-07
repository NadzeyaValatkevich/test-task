import axios from "axios";

const API_URL = "http://localhost:3002";

export const instance = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
  headers: {
    // "Content-Type": "application/json",
  },
});
