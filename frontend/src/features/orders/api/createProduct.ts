import { apiClient } from "../../../shared/api/client";
import type { Product } from "../../products/types";
import type { createProductFormValues } from "../../products/schema";

export const createProductRequest = async (
  payload: createProductFormValues,
) => {
  const { data } = await apiClient.post<{
    success: boolean;
    data: Product;
  }>("/products", payload);

  return data.data;
};
