import { apiClient } from "../../../shared/api/client";

export const deleteProductRequest = async (productId: string) => {
  await apiClient.delete(`/products/${productId}`);
};
