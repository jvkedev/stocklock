import { apiClient } from "../../../shared/api/client";
import type { LoginPayload, LoginResponse } from "../types";

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<{
    success: boolean;
    data: LoginResponse;
  }>("/auth/login", payload);

  return data.data;
};
