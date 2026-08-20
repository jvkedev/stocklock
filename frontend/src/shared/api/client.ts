import axios from "axios";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { refreshRequest } from "../../features/auth/api/refresh";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && !isRefreshCall) {
      try {
        const newAccessToken = await refreshRequest();

        useAuthStore.getState().setTokens(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearSession();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
