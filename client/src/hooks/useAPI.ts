import type { GlobalContext, API } from "../types/app";
import { globalContext } from "../App";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "./useLogout";
import axios from "axios";

const useAPI = (): API.APIData => {
  const { setUserData } = useContext(globalContext) as GlobalContext;
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const [formData, setFormData] = useState<API.APIFormData>({
    username: "",
    password: "",
    confirmPassword: "",
    newUsername: "",
    errors: {
      username: "",
      password: "",
      confirmPassword: "",
      newUsername: "",
    },
    successMsg: "",
    isBtnDisabled: false,
  });

  const resetFormErrors = (additive: API.APIFormAdditive = {}): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      errors: {
        username: "",
        password: "",
        confirmPassword: "",
        newUsername: "",
      },
      ...additive,
    }));
  };

  const request: API.APIRequestFunction = ({
    method = "get",
    route = "/api",
    withCredentials = false,
  }: API.APIRequestConfig = {}): void => {
    const { username, password, confirmPassword, newUsername } = formData;
    axios({
      method,
      url: `${import.meta.env.VITE_BACKEND_URL}${route}`,
      withCredentials,
      data: { username, newUsername, password, confirmPassword },
    })
      .then((res): void => {
        resetFormErrors({
          successMsg: res.data.successMsg,
          isBtnDisabled: true,
        });
        setTimeout((): void => {
          setUserData({ username: res.data.username, isAuthenticated: true });
          navigate("/");
        }, 1500);
      })
      .catch((err): void => {
        if (err.response.data?.error) {
          const { username, password, confirmPassword, newUsername } =
            err.response.data?.error.errors;
          setFormData((prevData) => ({
            ...prevData,
            errors: {
              ...prevData.errors,
              username: username?.message,
              password: password?.message,
              confirmPassword: confirmPassword?.message,
              newUsername: newUsername?.message,
            },
            isBtnDisabled: false,
          }));
        } else logout();
      });
  };

  useEffect((): void => resetFormErrors(), [location.pathname]);

  return [formData, setFormData, request];
};

export default useAPI;
