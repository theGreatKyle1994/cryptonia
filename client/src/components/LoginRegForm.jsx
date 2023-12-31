import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import axios from "axios";
import "./LoginRegForm.css";

const LoginRegForm = () => {
  const { setIsAuthenticated, isAuthenticated, setUserID } =
    useContext(globalContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    loginUsername: undefined,
    loginPassword: undefined,
    regUsername: undefined,
    regPassword: undefined,
    regConfirmPassword: undefined,
  });
  const [formInput, setFormInput] = useState({
    loginUsername: "",
    loginPassword: "",
    regUsername: "",
    regPassword: "",
    regConfirmPassword: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: value,
    }));
  };

  const authenticateUser = (id) => {
    sessionStorage.setItem("userId", id);
    setUserID(id);
    setIsAuthenticated(true);
    navigate("/home");
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const { loginUsername: username, loginPassword: password } = formInput;
    await axios
      .get("http://localhost:8000/api/user/login", {
        params: {
          username,
          password,
        },
      })
      .then((res) => {
        if (!res.data.error) {
          authenticateUser(res.data);
        } else {
          const { username, password } = res.data.error;
          setErrors((prevErrors) => ({
            ...prevErrors,
            loginUsername: username,
            loginPassword: password,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  const regSubmitHandler = async (e) => {
    e.preventDefault();
    const {
      regUsername: username,
      regPassword: password,
      regConfirmPassword: confirmPassword,
    } = formInput;
    await axios
      .post("http://localhost:8000/api/user/register", {
        username,
        password,
        confirmPassword,
      })
      .then((res) => {
        if (!res.data.error) {
          authenticateUser(res.data._id);
        } else {
          const { username, password, confirmPassword } = res.data.error.errors;
          setErrors((prevErrors) => ({
            ...prevErrors,
            regUsername: username,
            regPassword: password,
            regConfirmPassword: confirmPassword,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div id="login-reg-container">
      <form onSubmit={loginSubmitHandler} className="form-container">
        <h2>Login</h2>
        {errors.loginUsername && (
          <div className="form-error">{errors.loginUsername.message}</div>
        )}
        <div className="form-input-container">
          <label htmlFor="login-username">Username:</label>
          <input
            id="login-username"
            name="loginUsername"
            type="text"
            onChange={inputHandler}
            value={formInput.loginUsername}
          />
        </div>
        {errors.loginPassword && (
          <div className="form-error">{errors.loginPassword.message}</div>
        )}
        <div className="form-input-container">
          <label htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            name="loginPassword"
            type="password"
            onChange={inputHandler}
            value={formInput.loginPassword}
          />
        </div>
        <button>Login</button>
      </form>
      <form onSubmit={regSubmitHandler} className="form-container">
        <h2>Register</h2>
        {errors.regUsername && (
          <div className="form-error">{errors.regUsername.message}</div>
        )}
        <div className="form-input-container">
          <label htmlFor="reg-username">Username:</label>
          <input
            id="reg-username"
            name="regUsername"
            type="text"
            onChange={inputHandler}
            value={formInput.regUsername}
          />
        </div>
        {errors.regPassword && (
          <div className="form-error">{errors.regPassword.message}</div>
        )}
        <div className="form-input-container">
          <label htmlFor="reg-password">Password:</label>
          <input
            id="reg-password"
            name="regPassword"
            type="password"
            onChange={inputHandler}
            value={formInput.regPassword}
          />
        </div>
        {errors.regConfirmPassword && (
          <div className="form-error">{errors.regConfirmPassword.message}</div>
        )}
        <div className="form-input-container">
          <label htmlFor="reg-confirm-password">Confirm Password:</label>
          <input
            id="reg-confirm-password"
            name="regConfirmPassword"
            type="password"
            onChange={inputHandler}
            value={formInput.regConfirmPassword}
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

export default LoginRegForm;
