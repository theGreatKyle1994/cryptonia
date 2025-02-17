import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAPI = (setUserData) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errors: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const request = ({
    method = "get",
    route = "/api",
    withCredentials = false,
  } = {}) => {
    const { username, password, confirmPassword } = formData;
    axios({
      method,
      url: `${import.meta.env.VITE_BACKEND_URL}${route}`,
      withCredentials,
      data: { username, password, confirmPassword },
    })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ username: res.data.username })
        );
        setUserData({ username: res.data.username });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const { username, password, confirmPassword } =
          err.response.data.error.errors;
        setFormData((prevData) => ({
          ...prevData,
          errors: {
            ...prevData.errors,
            username: username?.message,
            password: password?.message,
            confirmPassword: confirmPassword?.message,
          },
        }));
      });
  };

  return [formData, setFormData, request];
};

export default useAPI;
