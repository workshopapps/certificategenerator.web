import axios from "axios";

const baseURL="https://certify-api.onrender.com/api"
const token = localStorage.getItem('accessToken')
console.log(token);


export default axios.create({
    baseURL,
});

const axiosPrivate = axios.create({
  baseURL,
  headers: { 
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`
 }
});
const axiosFormdata = axios.create({
  baseURL,
  headers: { 
    "Content-Type": "multipart/form-data",
    "Authorization" : `Bearer ${token}`
 }
});

export {axiosPrivate, axiosFormdata};
