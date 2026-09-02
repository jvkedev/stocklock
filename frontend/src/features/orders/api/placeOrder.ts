import { apiClient } from "../../../shared/api/client";
import type { Order, PlaceOrderPayload } from "../types";

export const placeOrderRequest = async (payload: PlaceOrderPayload) => {
  const { data } = await apiClient.post<{
    success: boolean;
    data: Order;
  }>("/orders", payload);

  return data.data;
};
