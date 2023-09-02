import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginRegForm = ({ authenticate }) => {
  const navigate = useNavigate();
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

  const regSubmitHandler = (e) => {
    e.preventDefault();
    const {
      regUsername: username,
      regPassword: password,
      regConfirmPassword: confirmPassword,
    } = formInput;
    axios
      .post("http://localhost:8000/user/create", {
        username,
        password,
        confirmPassword,
      })
      .then(() => {
        authenticate(true);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form id="login-reg-container">
        <h2>Login</h2>
        <div className="form-container">
          <label htmlFor="login-username">Username:</label>
          <input
            id="login-username"
            name="loginUsername"
            type="text"
            onChange={inputHandler}
            value={formInput.loginUsername}
          />
        </div>
        <div>
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
      <form onSubmit={regSubmitHandler}>
        <h2>Register</h2>
        <div className="form-container">
          <label htmlFor="reg-username">Username:</label>
          <input
            id="reg-username"
            name="regUsername"
            type="text"
            onChange={inputHandler}
            value={formInput.regUsername}
          />
        </div>
        <div>
          <label htmlFor="reg-password">Password:</label>
          <input
            id="reg-password"
            name="regPassword"
            type="password"
            onChange={inputHandler}
            value={formInput.regPassword}
          />
        </div>
        <div>
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
