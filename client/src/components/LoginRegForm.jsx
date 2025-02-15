import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import APIRequest from "../utilities/APIRequest";
import "./LoginRegForm.css";

const LoginRegForm = () => {
  const { setUserData } = useContext(globalContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    input: {
      loginUsername: "",
      loginPassword: "",
      regUsername: "",
      regPassword: "",
      regConfirmPassword: "",
    },
    errors: {
      loginUsername: undefined,
      loginPassword: undefined,
      regUsername: undefined,
      regPassword: undefined,
      regConfirmPassword: undefined,
    },
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      input: { ...prevFormData.input, [name]: value },
    }));
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const { loginUsername: username, loginPassword: password } = formData.input;
    await APIRequest({
      method: "post",
      route: "/api/user/login",
      data: { username, password },
      withCredentials: true,
      session: {
        name: "userData",
        callback: (res) => ({ username: res.username }),
      },
      state: {
        setter: setUserData,
        callback: (res) => ({ username: res.username }),
      },
      navigate: { callback: navigate, location: "/" },
      error: {
        setter: setFormData,
        callback: (err) => ({
          loginUsername: err.username,
          loginPassword: err.password,
        }),
      },
    });
  };

  const regSubmitHandler = async (e) => {
    e.preventDefault();
    const {
      regUsername: username,
      regPassword: password,
      regConfirmPassword: confirmPassword,
    } = formData.input;
    await APIRequest({
      method: "post",
      route: "/api/user/register",
      data: { username, password, confirmPassword },
      withCredentials: true,
      session: {
        name: "userData",
        callback: (res) => ({ username: res.username }),
      },
      state: {
        setter: setUserData,
        callback: (res) => ({ username: res.username }),
      },
      navigate: { callback: navigate, location: "/" },
      error: {
        setter: setFormData,
        callback: (err) => ({
          regUsername: err.username,
          regPassword: err.password,
          regConfirmPassword: err.confirmPassword,
        }),
      },
    });
  };

  return (
    <div id="login-reg-container">
      <form onSubmit={loginSubmitHandler} className="form-container">
        <h2>Login</h2>
        {formData.errors.loginUsername && (
          <div className="form-error">
            {formData.errors.loginUsername.message}
          </div>
        )}
        <div className="form-input-container">
          <label htmlFor="login-username">Username:</label>
          <input
            id="login-username"
            name="loginUsername"
            type="text"
            onChange={inputHandler}
            value={formData.input.loginUsername}
          />
        </div>
        {formData.errors.loginPassword && (
          <div className="form-error">
            {formData.errors.loginPassword.message}
          </div>
        )}
        <div className="form-input-container">
          <label htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            name="loginPassword"
            type="password"
            onChange={inputHandler}
            value={formData.input.loginPassword}
          />
        </div>
        <button>Login</button>
      </form>
      <form onSubmit={regSubmitHandler} className="form-container">
        <h2>Register</h2>
        {formData.errors.regUsername && (
          <div className="form-error">
            {formData.errors.regUsername.message}
          </div>
        )}
        <div className="form-input-container">
          <label htmlFor="reg-username">Username:</label>
          <input
            id="reg-username"
            name="regUsername"
            type="text"
            onChange={inputHandler}
            value={formData.input.regUsername}
          />
        </div>
        {formData.errors.regPassword && (
          <div className="form-error">
            {formData.errors.regPassword.message}
          </div>
        )}
        <div className="form-input-container">
          <label htmlFor="reg-password">Password:</label>
          <input
            id="reg-password"
            name="regPassword"
            type="password"
            onChange={inputHandler}
            value={formData.input.regPassword}
          />
        </div>
        {formData.errors.regConfirmPassword && (
          <div className="form-error">
            {formData.errors.regConfirmPassword.message}
          </div>
        )}
        <div className="form-input-container">
          <label htmlFor="reg-confirm-password">Confirm Password:</label>
          <input
            id="reg-confirm-password"
            name="regConfirmPassword"
            type="password"
            onChange={inputHandler}
            value={formData.input.regConfirmPassword}
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

export default LoginRegForm;
