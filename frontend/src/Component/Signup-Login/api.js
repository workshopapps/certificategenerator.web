import axios from "axios";

const baseURL = "http://34.195.230.138/api/auth";

const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const createNewUser = (userData) => {
  return axiosInstance.post("/signup", userData);
};
export const loginUser = (userData) => {
  return axiosInstance.post("/login", userData);
};
