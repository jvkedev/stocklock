import { apiClient } from "../../../shared/api/client";
import type { updateProfilePayload, User } from "../types";

export const updateProfileRequest = async (payload: updateProfilePayload) => {
  const { data } = await apiClient.patch<{ success: boolean; data: User }>(
    "/auth/me",
    payload,
  );

  return data.data;
};
