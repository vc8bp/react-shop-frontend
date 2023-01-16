import axios from "axios";


const BASE_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}`;

//const TOKEN = localStorage?.getItem("persist:root") && JSON.parse(JSON.parse(localStorage?.getItem("persist:root"))?.currentUser)?.accessToken;
//in above line i have used optionl chaining and it makes code hard to read so i made a simpler function

function getAccessToken() {
  const storage = JSON.parse(localStorage.getItem("persist:root"))
  const currentUser =  storage ? JSON.parse(storage.currentUser) : null;
  return currentUser ? currentUser?.accessToken : null
}


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  //headers: { token: `Bearer ${TOKEN}`},
});

userRequest.interceptors.request.use(config => {
  const newToken = getAccessToken();
  if (newToken) {
    config.headers.token = `Bearer ${newToken}`;
  }
  return config;
});
