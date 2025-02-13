import axios from "axios";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import { useState, useEffect, useContext } from "react";

const UpdateProfile = () => {
  const { isAuthenticated, setIsAuthenticated, setUserData } =
    useContext(globalContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    updateUsername: undefined,
    updateNewUsername: undefined,
    updatePassword: undefined,
  });
  const [successMsg, setSuccessMsg] = useState({
    updateNewUsername: undefined,
  });
  const [formInput, setFormInput] = useState({
    updateUsername: "",
    updateNewUsername: "",
    updatePassword: "",
  });

  const changeSubmitHandler = async (e) => {
    e.preventDefault();
    const { updateUsername, updateNewUsername, updatePassword } = formInput;
    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
        {
          username: updateUsername,
          usernameNew: updateNewUsername,
          password: updatePassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setSuccessMsg((prevSuccessMsgs) => ({
          ...prevSuccessMsgs,
          updateNewUsername: res.data.usernameNew,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          updateUsername: undefined,
          updateNewUsername: undefined,
          updatePassword: undefined,
        }));
        setUserData({ username: res.data.username });
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ username: res.data.username })
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error) {
          const { username, usernameNew, password } = err.response.data.error;
          setErrors((prevErrors) => ({
            ...prevErrors,
            updateUsername: username,
            updateNewUsername: usernameNew,
            updatePassword: password,
          }));
        } else setIsAuthenticated(false);
      });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormInput((prevFormInput) => ({ ...prevFormInput, [name]: value }));
  };

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <form onSubmit={changeSubmitHandler} className="form-container">
      <h2>Update Username</h2>
      {successMsg.updateNewUsername && (
        <div className="form-success">{successMsg.updateNewUsername}</div>
      )}
      {errors.updateUsername && (
        <div className="form-error">{errors.updateUsername.message}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="login-username">Current Username:</label>
        <input
          id="login-username"
          name="updateUsername"
          type="text"
          onChange={inputHandler}
          value={formInput.updateUsername}
        />
      </div>
      {errors.updateNewUsername && (
        <div className="form-error">{errors.updateNewUsername.message}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="login-username-new">New Username:</label>
        <input
          id="login-username-new"
          name="updateNewUsername"
          type="text"
          onChange={inputHandler}
          value={formInput.updateNewUsername}
        />
      </div>
      {errors.updatePassword && (
        <div className="form-error">{errors.updatePassword.message}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="login-password">Current Password:</label>
        <input
          id="login-password"
          name="updatePassword"
          type="password"
          onChange={inputHandler}
          value={formInput.updatePassword}
        />
      </div>
      <button>Change Username</button>
    </form>
  );
};

export default UpdateProfile;
