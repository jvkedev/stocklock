import { apiClient } from "../../../shared/api/client";

export const logoutRequest = async () => {
  await apiClient.post("/auth/logout");
};
