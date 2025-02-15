import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { globalContext } from "../App";
import APIRequest from "../utilities/APIRequest";
import "./LoginRegForm.css";

const LoginRegForm = () => {
  const { setUserData } = useContext(globalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    username: "",
    errors: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;
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
          username: err.username,
          password: err.password,
          confirmPassword: err.confirmPassword,
        }),
      },
    });
  };

  return (
    <form onSubmit={submitHandler} id="form-container">
      <h2>{`${location.pathname == "/login" ? "Login" : "Register"}`}</h2>
      {formData.errors.username && (
        <div className="form-error">{formData.errors.username}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={inputHandler}
          value={formData.username}
        />
      </div>
      {formData.errors.password && (
        <div className="form-error">{formData.errors.password}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={inputHandler}
          value={formData.password}
        />
      </div>
      {formData.errors.confirmPassword && location.pathname == "/register" && (
        <div className="form-error">{formData.errors.confirmPassword}</div>
      )}
      {location.pathname == "/register" && (
        <div className="form-input-container">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            onChange={inputHandler}
            value={formData.confirmPassword}
          />
        </div>
      )}
      <div id="button-container">
        <span>
          {`${
            location.pathname == "/login"
              ? "Need an account?"
              : "Already have an account?"
          }`}
        </span>
        <Link to={`${location.pathname == "/login" ? "/register" : "/login"}`}>
          {`${location.pathname == "/login" ? "Register" : "Login"}`}
        </Link>
        <button>
          {`${location.pathname == "/login" ? "Login" : "Register"}`}
        </button>
      </div>
    </form>
  );
};

export default LoginRegForm;
