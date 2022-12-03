import axios from 'axios';

const BASE_URL = "https://certify-api.onrender.com/api";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({  //sends req with necessary credentials
    baseURL: BASE_URL,
    headers: {'Content-Type': 'Application/json'},
    withCredentials: true
})