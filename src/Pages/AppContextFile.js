import React, { useState, createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../services/user/get";

export const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [plans, setPlans] = useState([]);
  const [receivedToken, setReceivedToken] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (role === "admin" && Cookies.get("jwt")) {
      Cookies.remove("jwt", { path: "/" });
    } else if (Cookies.get("jwt")) {
      Cookies.remove("jwt", { path: "/" });
    }

    setIsLoggedIn(false);
    setUser(null);
    setRole("");

    navigate("/");
  };

  const fetchUser = async (receivedToken) => {
    console.log({ receivedToken: receivedToken });
    const user = await getUser({ token: receivedToken });
    setRole(user.role);
    setUser(user);
  };

  useEffect(() => {
    if (!!user) return;
    if (!Cookies.get("jwt")) {
      navigate("/login");
      return;
    }

    const newToken = Cookies.get("jwt");
    setReceivedToken(newToken);
    setIsLoggedIn(true);
    fetchUser(newToken);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        role,
        setRole,
        plans,
        setPlans,
        isLoggedIn,
        setIsLoggedIn,
        handleLogout,
        receivedToken,
        setReceivedToken,
        isDropdownOpen,
        setDropdownOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
