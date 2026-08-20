import { create } from "zustand";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setSession: (user: User, accessToken: string) => void;
  setTokens: (accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setSession: (user, accessToken) =>
    set({
      user,
      accessToken,
    }),

  setTokens: (accessToken) =>
    set({
      accessToken,
    }),

  clearSession: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));
