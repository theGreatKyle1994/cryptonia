import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import "./Form.css";

const Form = ({ setUserData }) => {
  const location = useLocation();
  const [routeData, setRouteData] = useState({
    route: "",
    routeTo: "",
    header: "",
    btnText: "",
    btnMsg: "",
  });
  const [formData, setFormData, APICall] = useAPI(setUserData);

  const checkRoute = (path) => {
    switch (path) {
      case "/login":
        return {
          method: "post",
          route: "/login",
          apiRoute: "/api/user/login",
          routeTo: "/register",
          header: "Login",
          btnText: "Sign in",
          btnMsg: "Need an account?",
        };
      case "/register":
        return {
          method: "post",
          route: "/register",
          apiRoute: "/api/user/register",
          routeTo: "/login",
          header: "Register",
          btnText: "Create Account",
          btnMsg: "Already have an account?",
        };
      case "/profile":
        return {
          method: "put",
          route: "/profile",
          apiRoute: "/api/user/update",
          routeTo: "/",
          header: "Update Username",
          btnText: "Change Username",
          btnMsg: "",
        };
    }
  };

  const resetErrors = () => {
    setFormData((prevData) => ({
      ...prevData,
      errors: { username: "", password: "", confirmPassword: "" },
    }));
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    APICall({
      method: routeData.method,
      route: routeData.apiRoute,
      withCredentials: true,
    });
  };

  useEffect(
    () => setRouteData(checkRoute(location.pathname)),
    [location.pathname]
  );

  return (
    <form onSubmit={submitHandler} id="form-container">
      <h2>{routeData.header}</h2>
      {formData.success.login && (
        <div className="form-success">{formData.success.login}</div>
      )}
      {formData.success.register && (
        <div className="form-success">{formData.success.register}</div>
      )}
      {formData.success.newUsername && (
        <div className="form-success">{formData.success.newUsername}</div>
      )}
      {formData.errors.username && (
        <div className="form-error">{formData.errors.username}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="username">
          {routeData.route == "/profile" ? "Current Username:" : "Username"}
        </label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={inputHandler}
          value={formData.username}
        />
      </div>
      {formData.errors.newUsername && routeData.route == "/profile" && (
        <div className="form-error">{formData.errors.newUsername}</div>
      )}
      {routeData.route == "/profile" && (
        <div className="form-input-container">
          <label htmlFor="username-new">New Username:</label>
          <input
            id="username-new"
            name="newUsername"
            type="text"
            onChange={inputHandler}
            value={formData.newUsername}
          />
        </div>
      )}
      {formData.errors.password && (
        <div className="form-error">{formData.errors.password}</div>
      )}
      <div className="form-input-container">
        <label htmlFor="password">
          {routeData.route == "/profile" ? "Current Password" : "Password"}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={inputHandler}
          value={formData.password}
        />
      </div>
      {formData.errors.confirmPassword && routeData.route == "/register" && (
        <div className="form-error">{formData.errors.confirmPassword}</div>
      )}
      {routeData.route == "/register" && (
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
        <span>{routeData.subText}</span>
        <Link onClick={resetErrors} to={routeData.routeTo}>
          {routeData.btnMsg}
        </Link>
        <button>{routeData.btnText}</button>
      </div>
    </form>
  );
};

export default Form;
