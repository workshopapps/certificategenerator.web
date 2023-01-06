import axios from "axios";
import { baseURL } from "../../api/axios";

const baseUrl = `${baseURL}/auth`;

const axiosInstance = axios.create({
  baseUrl,
  headers: { "Content-Type": "application/json" }
});

export const createNewUser = userData => {
  return axiosInstance.post("/signup", userData);
};
export const loginUser = userData => {
  return axiosInstance.post("/login", userData);
};
