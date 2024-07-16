import { handleStatus } from "@/utils/handleStatus";
import axios, { AxiosError } from "axios";
import { Cookies } from "react-cookie";
import { API_BASE_URL } from "../constants/allEnv";
const cookie = new Cookies();

console.log("API_BASE_URL", API_BASE_URL);

const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = cookie.get("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);
axiosPrivate.interceptors.response.use(
  (config) => {
    return config;
  },
  (err: AxiosError) => {
    const { response, message } = err;
    handleStatus(response?.status, message);
  }
);

const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

export { axiosPrivate, axiosPublic };
