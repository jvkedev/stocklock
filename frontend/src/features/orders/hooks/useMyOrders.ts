import { useQuery } from "@tanstack/react-query";
import { getMyOrdersRequest } from "../api/getMyOrders";

export const useMyOrders = () => {
  return useQuery({
    queryKey: ["orders", "mine"],
    queryFn: getMyOrdersRequest,
  });
};
