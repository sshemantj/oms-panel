import { handleStatus } from "@/utils/handleStatus";
import axios, { AxiosError } from "axios";
import { NEXT_PUBLIC_PREPROD_API_BASE_URL } from "../constants/allEnv";
import { getCookie } from "cookies-next";

const axiosPrivate = axios.create({
  baseURL: NEXT_PUBLIC_PREPROD_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
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
  baseURL: NEXT_PUBLIC_PREPROD_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

export { axiosPrivate, axiosPublic };
