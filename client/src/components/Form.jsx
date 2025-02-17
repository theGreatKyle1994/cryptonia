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
          route: "/login",
          routeTo: "/register",
          header: "Login",
          btnText: "Sign in",
          btnMsg: "Need an account?",
        };
      case "/register":
        return {
          route: "/register",
          routeTo: "/login",
          header: "Register",
          btnText: "Create Account",
          btnMsg: "Already have an account?",
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
      method: "post",
      route: `/api/user${routeData.route}`,
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
        <Link onClick={() => resetErrors()} to={routeData.routeTo}>
          {routeData.btnMsg}
        </Link>
        <button>{routeData.btnText}</button>
      </div>
    </form>
  );
};

export default Form;
