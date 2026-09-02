import { useQuery } from "@tanstack/react-query";
import { getProductsRequest } from "../api/getProducts";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsRequest,
  });
};
