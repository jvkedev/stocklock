import { apiClient } from "../../../shared/api/client";
import type { RegisterPayload, User } from "../types";

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<{
    success: boolean;
    data: User;
  }>("/auth/register", payload);

  return data.data;
};
