import { create } from "zustand";

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: "ADMIN" | "MANAGER" | "GUDANG" | "PRODUKSI";
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserProfile, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "US-b2c3d4e5-f6a7-8901-bcde-f23456789012",
    username: "manager",
    name: "Budi Manager",
    email: "manager@sumbergizi.com",
    role: "MANAGER",
  },
  token: "demo-jwt-token",
  isAuthenticated: true,
  setAuth: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
