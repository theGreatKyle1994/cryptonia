import { globalContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setUserData } = useContext(globalContext);
  const navigate = useNavigate();

  const logout = (navigateTo = undefined) => {
    setUserData({ username: "", isAuthenticated: false });
    if (navigateTo) navigate(navigateTo);
  };

  return logout;
};

export default useLogout;
