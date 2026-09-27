import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateProductFormValues } from "../schema";
import { updateProductRequest } from "../api/updateProduct";

export const useUpdateProduct = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProductFormValues) =>
      updateProductRequest(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
