import React, { createContext, useContext, useEffect, useState } from "react";
import { checkLocalStorageLoggedInStatus } from "../pages/common";
import { getCurrentUserService, logoutService } from "../services";
import token from "@/utils/token";
import { showToast } from "./toast";


const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await checkLocalStorageLoggedInStatus();
      const { status, payload } = await getCurrentUserService();

      if (!status || !loginStatus) {
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(loginStatus);
      setUserType(payload.userType);
      setCurrentUser(payload);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "6px solid #ccc",
            borderTop: "6px solid #232323",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    );
  }

  // const logout = () => {
  //   setIsLoggedIn(false);
  //   setUserType(null);
  //   setCurrentUser(null);
  //   token.removeAll();
  //   window.location.href = "/";
  // };

  const logout = async () => {
    try {
      const { status, msg, cls } = await logoutService();
      showToast(msg, cls);

      if (status === 1) {
        setTimeout(() => {
          setIsLoggedIn(false);
          setUserType(null);
          setCurrentUser(null);
          token.removeAll();
        }, 1000);
      }
    } catch (error) {
      showToast("An error occurred during logout.", "error");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, currentUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
