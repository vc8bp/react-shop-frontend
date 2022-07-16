import axios from "axios";


const BASE_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}`;
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjA0ZjFlODcyMjExOTZhYTY5MmE4OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTcyODUxNzMsImV4cCI6MTY1NzQ1Nzk3M30.LYwkuj1EG_MtYQFnadT2XN0SYR1w2m6EQEs0p0PW1AQ"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});