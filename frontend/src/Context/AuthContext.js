import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

const AuthContextProvider = props => {
  const [activeUser, setActiveUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");

  // Axios config with auth header
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
  };

  // Shared Axios instance pointing at backend API
  const api = axios.create({
    // Prefer env var, fall back to local backend
    baseURL: "https://equine-excellence.onrender.com/api",
  });

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken("");
    setActiveUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me", {
          headers: {
            authorization: `Bearer ${storedToken}`,
          },
        });
        setActiveUser(data.user);
        setToken(storedToken);
      } catch (error) {
        logout();
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        activeUser,
        setActiveUser,
        token,
        setToken,
        config,
        api,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
