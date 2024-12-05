import axios from "axios";
import { AuthDataService } from "../services/Auth.service";

const getToken = () => localStorage.getItem("token");
const getRefresh = () => localStorage.getItem("refresh");

const instance = axios.create({
  baseURL: "http://localhost:3003/",
  headers: {
    "Content-Type": "application/json",
    ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await AuthDataService.refreshToken(
          getRefresh() as string
        );

        if (refreshResponse instanceof Error) {
          console.error("Erro ao renovar o token");
          window.location.href = "/login";
          return Promise.reject(refreshResponse);
        }

        const newToken = refreshResponse.data.access_token;
        localStorage.setItem("token", newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Erro ao renovar o token", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
