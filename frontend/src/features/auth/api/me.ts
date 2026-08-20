import { apiClient } from "../../../shared/api/client";
import type { User } from "../types";

export const getMeRequest = async () => {
  const { data } = await apiClient.get<{ success: boolean; data: User }>("/auth/me");
  return data.data;
};
