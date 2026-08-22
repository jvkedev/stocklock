import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../api/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
  });
};
