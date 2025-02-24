import type { GlobalContext, LogoutFunction } from "../types/app";
import { globalContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = (): LogoutFunction => {
  const { setUserData } = useContext(globalContext) as GlobalContext;
  const navigate = useNavigate();

  const logout: LogoutFunction = (navigateTo) => {
    setUserData({ username: "", isAuthenticated: false });
    if (navigateTo) navigate(navigateTo);
  };

  return logout;
};

export default useLogout;
