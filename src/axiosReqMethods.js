import axios from "axios";


const BASE_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}`;

const TOKEN = localStorage?.getItem("persist:root") && JSON.parse(JSON.parse(localStorage?.getItem("persist:root"))?.currentUser)?.accessToken;


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}`},
});