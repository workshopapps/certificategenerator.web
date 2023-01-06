import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default axios.create({
  baseURL
});

const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
});

const axiosFormData = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`
  }
});

export { axiosPrivate, axiosFormData, baseURL };
