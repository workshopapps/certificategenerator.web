import axios from "axios";

const baseURL="https://certify-api.onrender.com/api/docs/api/auth"

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
