import { useMutation } from "@tanstack/react-query";
import { logoutRequest } from "../api/logout";
import { useAuthStore } from "../store/auth.store";

export const useLogout = () => {
  const clearSession = useAuthStore((s) => s.clearSession);

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      clearSession();
    },
  });
};
