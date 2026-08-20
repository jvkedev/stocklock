import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/login";
import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      console.log("Login success:", data);
      setSession(data.user, data.accessToken);
    },
  });
};
