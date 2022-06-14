import axios from "axios";


const BASE_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}`;
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzNhODgwOWYxMWI5OTViN2UyNmQxNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MzIxNzQ5MiwiZXhwIjoxNjUzNDc2NjkyfQ.RrXlRmfAbUsoR8UNgbj28s-fORlQHQMo5uK-R9Cv3Ts"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});