import axios from "axios";
import { getToken } from "../utils/secureStorage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://16.170.238.199";
let onUnauthorized: (() => void) | null = null;

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onUnauthorized) {
      onUnauthorized();
    }

    return Promise.reject(error);
  }
);

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

export default api;
