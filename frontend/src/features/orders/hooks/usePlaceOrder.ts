import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeOrderRequest } from "../api/placeOrder";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeOrderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "mine"] });
    },
  });
};
