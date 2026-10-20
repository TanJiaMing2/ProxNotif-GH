import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        // Optional: You can fetch user data using the token here if needed
        // const userData = await fetchUserData(storedToken);
        // setUser(userData);
      }
    } catch (error) {
      console.error("Failed to load token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://DCS2209221.dcs5604.com/signin.php",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        const { token } = response.data;
        await AsyncStorage.setItem("token", token);
        setToken(token);
        // Optional: Fetch and set user data if needed
        // const userData = await fetchUserData(token);
        // setUser(userData);
        return true; // Successful login
      } else {
        console.error(
          "Login failed:",
          response.data.message || "Invalid credentials"
        );
        return false; // Failed login
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false; // Failed login due to error
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Failed to clear token:", error);
    }
  };

  const authContextValue = {
    user,
    token,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
