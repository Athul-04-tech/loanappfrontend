import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api, { setUnauthorizedHandler } from "../api/client";
import { ApiResponse, User } from "../types";
import { deleteToken, getToken, saveToken } from "../utils/secureStorage";

type AuthContextValue = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (accountNumber: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function logout() {
    await deleteToken();
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    setUnauthorizedHandler(logout);

    async function loadSession() {
      const storedToken = await getToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        setToken(storedToken);
        const response = await api.get<ApiResponse<{ user: User }>>("/api/auth/me");
        setUser(response.data.data?.user || null);
      } catch {
        await logout();
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    return () => setUnauthorizedHandler(null);
  }, []);

  async function keepSession(nextToken: string, nextUser: User) {
    await saveToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }

  async function login(email: string, password: string) {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>("/api/auth/login", {
      email,
      password,
    });
    const data = response.data.data;

    if (data) {
      await keepSession(data.token, data.user);
    }
  }

  async function register(accountNumber: string, email: string, password: string) {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>("/api/auth/register", {
      accountNumber,
      email,
      password,
    });
    const data = response.data.data;

    if (data) {
      await keepSession(data.token, data.user);
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
