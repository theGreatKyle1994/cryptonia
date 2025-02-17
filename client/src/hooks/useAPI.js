import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAPI = (setUserData) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    newUsername: "",
    errors: {
      username: "",
      password: "",
      confirmPassword: "",
      newUsername: "",
    },
    success: {
      login: "",
      register: "",
      newUsername: "",
    },
    isBtnDisabled: false,
  });

  const resetFormErrors = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      errors: {
        username: "",
        password: "",
        confirmPassword: "",
        newUsername: "",
      },
    }));
  };

  const request = ({
    method = "get",
    route = "/api",
    withCredentials = false,
  } = {}) => {
    const { username, password, confirmPassword, newUsername } = formData;
    axios({
      method,
      url: `${import.meta.env.VITE_BACKEND_URL}${route}`,
      withCredentials,
      data: { username, newUsername, password, confirmPassword },
    })
      .then((res) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          success: {
            login: res.data.success?.login?.message,
            register: res.data.success?.register?.message,
            newUsername: res.data.success?.newUsername?.message,
          },
          isBtnDisabled: true,
        }));
        resetFormErrors();
        setUserData({ username: res.data.username });
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ username: res.data.username })
        );
        setTimeout(() => navigate("/"), 3000);
      })
      .catch((err) => {
        if (err.response.data?.error) {
          const { username, password, confirmPassword, newUsername } =
            err.response.data.error.errors;
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
        } else setUserData(undefined);
      });
  };

  useEffect(() => resetFormErrors(), [location.pathname]);

  return [formData, setFormData, request];
};

export default useAPI;
