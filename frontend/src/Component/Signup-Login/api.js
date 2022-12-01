import axios from "axios";

const baseURL = "https://certo.hng.tech/api/auth";

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
