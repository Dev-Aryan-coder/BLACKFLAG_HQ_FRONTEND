import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/api/client.jsx";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("bf_token"));
  const [role, setRole] = useState(() => localStorage.getItem("bf_role"));
  const [pirateId, setPirateId] = useState(() => localStorage.getItem("bf_pirate_id"));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("bf_email") || "admin@blackflag.com");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      if (response.data && response.data.success) {
        const data = response.data.data;
        const receivedToken = data.token;
        const receivedRole = data.role;
        const receivedPirateId = data.pirateId;

        setToken(receivedToken);
        setRole(receivedRole);
        setPirateId(receivedPirateId);
        setUserEmail(email);

        localStorage.setItem("bf_token", receivedToken);
        localStorage.setItem("bf_role", receivedRole);
        localStorage.setItem("bf_email", email);
        if (receivedPirateId) {
          localStorage.setItem("bf_pirate_id", receivedPirateId);
        } else {
          localStorage.removeItem("bf_pirate_id");
        }

        return { success: true, data };
      }
      return { success: false, message: response.data.message || "Login failed" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to login";
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await apiClient.post("/auth/logout");
      }
    } catch (err) {
      console.warn("Logout request failed:", err);
    } finally {
      setToken(null);
      setRole(null);
      setPirateId(null);
      localStorage.removeItem("bf_token");
      localStorage.removeItem("bf_role");
      localStorage.removeItem("bf_email");
      localStorage.removeItem("bf_pirate_id");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        pirateId,
        userEmail,
        isAuthenticated: !!token,
        isAdmin: role === "ADMIN",
        isCrew: role === "CREW",
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
