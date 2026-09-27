import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductRequest } from "../api/deleteProduct";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
