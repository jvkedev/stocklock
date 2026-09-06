import { apiClient } from "../../../shared/api/client";
import type { MyOrder } from "../types";

export const getMyOrdersRequest = async () => {
  const { data } = await apiClient.get<{ success: boolean; data: MyOrder[] }>(
    "/orders/mine",
  );

  return data.data;
};
