import { apiClient } from "../../../shared/api/client";
import type { ChangePasswordFormValues } from "../schema";

export const changePasswordRequest = async (
  payload: ChangePasswordFormValues,
) => {
  const { data } = await apiClient.patch<{
    success: boolean;
    data: { message: string };
  }>("/auth/change-password", payload);

  return data.data;
};
