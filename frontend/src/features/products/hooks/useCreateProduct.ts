import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductRequest } from "../../products/api/createProduct";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
