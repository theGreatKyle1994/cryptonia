import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const UpdateProfile = ({ userID, isAuthenticated }) => {
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
      .put(`http://localhost:8000/user/update/${userID}`, {
        username: updateUsername,
        usernameNew: updateNewUsername,
        password: updatePassword,
      })
      .then((res) => {
        if (res.data.error) {
          const { username, usernameNew, password } = res.data.error;
          setErrors((prevErrors) => ({
            ...prevErrors,
            updateUsername: username,
            updateNewUsername: usernameNew,
            updatePassword: password,
          }));
          setSuccessMsg((prevSuccessMsgs) => ({
            ...prevSuccessMsgs,
            updateNewUsername: undefined,
          }));
        } else {
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
          setFormInput({
            updateUsername: "",
            updateNewUsername: "",
            updatePassword: "",
          });
        }
      })
      .catch((err) => console.log(err));
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
        <div className="form-success">
          {successMsg.updateNewUsername.message}
        </div>
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
        <label htmlFor="login-password">Re-Type Password:</label>
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
