import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../api/Register";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
  });
};
