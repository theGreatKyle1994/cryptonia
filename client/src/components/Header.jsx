import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../App";
import "./Header.css";

const Header = () => {
  const { userData, setUserData } = useContext(globalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    sessionStorage.clear();
    setUserData(undefined);
    navigate("/home");
  };

  const headerName = (path) => {
    switch (path) {
      case "/home":
        return "Home";
      case "/favorites":
        return "Favorites";
      case "/login":
        return "Sign-In";
      case "/register":
        return "Create an Account";
      case "/profile":
        return "Profile";
    }
  };

  return (
    <>
      <header>
        <h1>Cryptonia</h1>
        <nav>
          {userData && (
            <span id="welcome-user">Signed-In: {userData.username}</span>
          )}
          <div>
            {location.pathname == "/home" && !userData && (
              <Link to={"/login"}>
                <button type="submit">Login</button>
              </Link>
            )}
            {location.pathname == "/home" && userData && (
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
            {location.pathname == "/favorites" && userData && (
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
            {location.pathname == "/login" && (
              <Link to={"/home"}>
                <button type="submit">Home</button>
              </Link>
            )}
            {location.pathname == "/register" && (
              <Link to={"/home"}>
                <button type="submit">Home</button>
              </Link>
            )}
            {location.pathname == "/profile" && (
              <>
                <Link to={"/home"}>
                  <button type="submit">Home</button>
                </Link>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </div>
        </nav>
      </header>
      <h2>{headerName(location.pathname)}</h2>
    </>
  );
};

export default Header;
