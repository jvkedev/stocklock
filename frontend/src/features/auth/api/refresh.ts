import { apiClient } from "../../../shared/api/client";
import type { AuthTokens } from "../types";

export const refreshRequest = async (): Promise<string> => {
  const { data } = await apiClient.post<{
    success: boolean;
    data: AuthTokens;
  }>("/auth/refresh");

  return data.data.accessToken;
};
