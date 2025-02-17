import { useLocation, Link } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import "./Form.css";

const Form = ({ setUserData }) => {
  const location = useLocation();
  const [formData, setFormData, APICall] = useAPI(setUserData);

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
      route: `/api/user/${
        location.pathname == "/login" ? "login" : "register"
      }`,
      withCredentials: true,
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
        <Link
          onClick={() =>
            setFormData((prevData) => ({
              ...prevData,
              errors: { username: "", password: "", confirmPassword: "" },
            }))
          }
          to={`${location.pathname == "/login" ? "/register" : "/login"}`}
        >
          {`${location.pathname == "/login" ? "Register" : "Login"}`}
        </Link>
        <button>
          {`${location.pathname == "/login" ? "Login" : "Register"}`}
        </button>
      </div>
    </form>
  );
};

export default Form;
