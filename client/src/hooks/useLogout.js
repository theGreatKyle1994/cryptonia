import { useNavigate } from "react-router-dom";

const useLogout = (setUserData) => {
  const navigate = useNavigate();

  const logout = (navigateTo = undefined) => {
    setUserData({ username: "", isAuthenticated: false });
    if (navigateTo) navigate(navigateTo);
  };
  return logout;
};

export default useLogout;
