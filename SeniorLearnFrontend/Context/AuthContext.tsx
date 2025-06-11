import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiLogin } from "../api";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  role: "Administrator" | "Member" | null;
  setRole: (role: "Administrator" | "Member" | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
}

const STORAGE_KEY = "auth_data";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"Administrator" | "Member" | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  //const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getAuthState();
    
  }, []);

  useEffect(() => {
    setAuthState(token, role, username);
  }, [token, role]);

  const getAuthState = async () => {
    try {
      console.log("Fetching stored authentication data...");
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const data = JSON.parse(stored);
        console.log("Retrieved Auth Data:", data);

        setToken(data.token || null);
        if (data.role === "Administrator" || data.role === "Member") {
          setRole(data.role);
        } else {
          console.warn("Invalid role found in storage, resetting to null.");
          setRole(null);
        }
        setUsername(data.username || null);
      } else {
        console.warn("No stored auth data found.");
      }
    } catch (err) {
      console.error("Error retrieving auth state:", err);
      setToken(null);
      setRole(null);
      setUsername(null);
      

    }
  };

  const setAuthState = async (
    token: string | null,
    role: "Administrator" | "Member" | null,
    username: string | null
  ) => {
    try {
      const data = JSON.stringify({ token, role, username });
      console.log("Saving authentication data:", data);

      await AsyncStorage.setItem(STORAGE_KEY, data);
      console.log("Authentication data saved successfully.");
    } catch (error) {
      console.error("Failed to save auth state:", error);
    }
  };

  const login = async (username: string, password: string) => {
    console.log(`Attempting login with username: ${username}`);

    // Hardcoded Test Credentials
    /*     if (username === "testuser" && password === "testpass") {
      setToken("hardcodedToken");
      setRole("user");
      console.log("Test user logged in successfully.");
      return true;
    } */

    try {
      const response = await ApiLogin(username, password);
      console.log("API Login Response:", response);

      if (response.success && response.token) {
        setToken(response.token);

        if (response.role === "Administrator" || response.role === "Member") {
          setRole(response.role);
        } else {
          setRole(null);
        }
        setUsername(username);

        //console.log(`Login successful. Assigned role: ${assignedRole}`);

        return true;
      } else {
        console.warn("Login failed:", response.message || "Missing token");
        return false;
      }
    } catch (error: any) {
      console.error("Login error:", error?.message || error);
      return false;
    }
  };

  const logout = () => {
    console.log("Logging out user...");
    setToken(null);
    setRole(null);

    AsyncStorage.removeItem(STORAGE_KEY)
      .then(() => console.log("Auth state cleared successfully."))
      .catch((err) => console.error("Failed to clear auth state:", err));
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, login, logout, role, setRole, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
