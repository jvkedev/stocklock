import { apiClient } from "../../../shared/api/client";
import type { Product } from "../types";
import type { createProductFormValues } from "../schema";

export const createProductRequest = async (
  payload: createProductFormValues,
) => {
  const { data } = await apiClient.post<{
    success: boolean;
    data: Product;
  }>("/products", payload);

  return data.data;
};
