import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { updateProfileRequest } from "../api/updateProfile";

export const useUpdateProfile = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: (user) => {
      setUser(user);
    },
  });
};
