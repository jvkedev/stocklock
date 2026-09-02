import { apiClient } from "../../../shared/api/client";
import type { Product } from "../types";

export const getProductsRequest = async () => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: Product[];
  }>("/products");

  return data.data;
};
