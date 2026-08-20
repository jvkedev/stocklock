import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { refreshRequest } from "../api/refresh";
import { getMeRequest } from "../api/me";

let restorePromise: Promise<void> | null = null;

const restoreSession = async () => {
  try {
    const accessToken = await refreshRequest();
    useAuthStore.getState().setTokens(accessToken);
    const user = await getMeRequest();
    useAuthStore.getState().setSession(user, accessToken);
  } catch {
    // no valid session — stay logged out
  }
};

export const useRestoreSession = () => {
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    if (!restorePromise) {
      restorePromise = restoreSession();
    }

    restorePromise.then(() => setIsRestoring(false));
  }, []);

  return { isRestoring };
};
