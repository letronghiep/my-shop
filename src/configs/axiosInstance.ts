import { notification } from "antd";
import axios, { InternalAxiosRequestConfig } from "axios";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use(function (
  config: InternalAxiosRequestConfig<any>
) {
  if (process.env.NEXT_PUBLIC_API_KEY) {
    config.headers["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY;
  } else {
    delete config.headers["x-api-key"];
  }
  const token = localStorage.getItem("token");
  if (token) {
    const dataToken = JSON.parse(token);
    const { accessToken, client_id } = dataToken;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["x-client-id"] = client_id;
  }
  if (!token) {
    delete config.headers["Authorization"];
    delete config.headers["x-client-id"];
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the data from the response
  },
  (error) => {
    if (error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
