import { apiClient } from "../../../shared/api/client";
import type { Product } from "../types";
import type { updateProductFormValues } from "../schema";

export const updateProductRequest = async (
  productId: string,
  payload: updateProductFormValues,
) => {
  const { data } = await apiClient.patch<{
    success: boolean;
    data: Product;
  }>(`/products/${productId}`, payload);

  return data.data;
};
