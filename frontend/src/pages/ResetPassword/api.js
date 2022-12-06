import axios from "axios";

const baseURL = "https://certify-api.onrender.com/api/auth/";

const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

export const resetPassword = userData => {
  return axiosInstance.post(`/changepassword/:userId/:token`, userData);
};
