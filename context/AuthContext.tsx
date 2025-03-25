"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";
import Cookies from "js-cookie"; // Handle cookies client-side

interface AuthContextType {
  user: User | null;
  logout: () => void;
  login: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  // Function to handle login
  const login = (user: User, token: string) => {
    setUser(user);
    Cookies.set("role", JSON.stringify(user.role), { expires: 1 });
    Cookies.set("token", token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("role");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
