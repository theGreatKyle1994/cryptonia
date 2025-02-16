import axios from "axios";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import { useState, useContext, useEffect } from "react";

const UpdateProfile = () => {
  const { setUserData } = useContext(globalContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    newUsername: "",
    password: "",
    errors: {
      username: "",
      newUsername: "",
      password: "",
    },
    success: {
      newUsername: "",
    },
  });

  const changeSubmitHandler = async (e) => {
    e.preventDefault();
    const { username, newUsername, password } = formData;
    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
        { username, newUsername, password },
        { withCredentials: true }
      )
      .then((res) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          errors: { username: "", newUsername: "", password: "" },
          success: { newUsername: res.data.newUsername },
        }));
        setUserData({ username: res.data.username });
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ username: res.data.username })
        );
      })
      .catch((err) => {
        if (err.response.data?.error) {
          const { username, newUsername, password } = err.response.data.error;
          setFormData((prevFormData) => ({
            ...prevFormData,
            errors: {
              username: username?.message,
              newUsername: newUsername?.message,
              password: password?.message,
            },
          }));
        } else setUserData(undefined);
      });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    if (!sessionStorage.getItem("userData")) {
      setUserData(undefined);
      navigate("/");
    }
  }, []);

  return (
    <form onSubmit={changeSubmitHandler} id="form-container">
      <h2>Update Username</h2>
      {formData.success.newUsername && (
        <div className="form-success">{formData.success.newUsername}</div>
      )}
      {formData.errors.username && (
        <div className="form-error">{formData.errors.username}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="login-username">Current Username:</label>
        <input
          id="login-username"
          name="username"
          type="text"
          onChange={inputHandler}
          value={formData.username}
        />
      </div>
      {formData.errors.newUsername && (
        <div className="form-error">{formData.errors.newUsername}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="login-username-new">New Username:</label>
        <input
          id="login-username-new"
          name="newUsername"
          type="text"
          onChange={inputHandler}
          value={formData.newUsername}
        />
      </div>
      {formData.errors.password && (
        <div className="form-error">{formData.errors.password}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="login-password">Current Password:</label>
        <input
          id="login-password"
          name="password"
          type="password"
          onChange={inputHandler}
          value={formData.password}
        />
      </div>
      <div id="button-container">
        <button>Change Username</button>
      </div>
    </form>
  );
};

export default UpdateProfile;
