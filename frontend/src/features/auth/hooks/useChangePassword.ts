import { useMutation } from "@tanstack/react-query";
import { changePasswordRequest } from "../api/changePassword";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordRequest,
  });
};
