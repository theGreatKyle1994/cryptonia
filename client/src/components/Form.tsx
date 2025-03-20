import { Link } from "react-router-dom";
import getRouteData from "../utilities/getRouteData";
import { useLocation } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import "./Form.css";

const Form: React.FC = (): React.ReactElement => {
  console.log("Form");
  const location = useLocation();
  const [formData, setFormData, APICall] = useAPI();
  const routeData = getRouteData(location.pathname);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    APICall({
      method: routeData.method,
      route: routeData.apiRoute,
      withCredentials: true,
    });
  };

  return (
    <form onSubmit={submitHandler} id="form-container">
      <h2>{routeData.header}</h2>
      {formData.successMsg && (
        <div className="form-success">{formData.successMsg}</div>
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
        <Link to={routeData.routeTo}>{routeData.btnMsg}</Link>
        <button disabled={formData.isBtnDisabled}>{routeData.btnText}</button>
      </div>
    </form>
  );
};

export default Form;
