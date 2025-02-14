import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../App";
import "./Header.css";

const Header = () => {
  const { currentPath, userData, setUserData } = useContext(globalContext);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    setUserData({});
    navigate("/home");
  };

  return (
    <header>
      <h1>Cryptonia</h1>
      <nav>
        {userData.username && (
          <span id="welcome-user">Signed-In: {userData.username}</span>
        )}
        {currentPath.pathname == "/home" && !userData.username && (
          <Link to={"/login-reg"}>
            <button type="submit">Login | Register</button>
          </Link>
        )}
        {currentPath.pathname == "/home" && userData.username && (
          <>
            <Link to={"/favorites"}>
              <button type="submit">Favorites</button>
            </Link>
            <Link to={"/profile"}>
              <button type="submit">Profile</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {currentPath.pathname == "/favorites" && userData.username && (
          <>
            <Link to={"/home"}>
              <button type="submit">Home</button>
            </Link>
            <Link to={"/profile"}>
              <button type="submit">Profile</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {currentPath.pathname == "/login-reg" && (
          <Link to={"/home"}>
            <button type="submit">Home</button>
          </Link>
        )}
        {currentPath.pathname == "/profile" && (
          <>
            <Link to={"/home"}>
              <button type="submit">Home</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
