import type { GlobalContext } from "../types/app";
import { globalContext } from "../App";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import "./Header.css";

const Header = (): JSX.Element => {
  const { userData } = useContext(globalContext) as GlobalContext;
  const location = useLocation();
  const logout = useLogout();

  const headerName = (path: string): string => {
    switch (path) {
      case "/home":
        return "Home";
      case "/favorites":
        return "Favorites";
      case "/login":
        return "Sign In";
      case "/register":
        return "Create an Account";
      case "/profile":
        return "Profile";
      default:
        return "undefined";
    }
  };

  return (
    <>
      <header>
        <h1>Cryptonia</h1>
        <nav>
          {userData.isAuthenticated && (
            <span id="welcome-user">Signed-In: {userData.username}</span>
          )}
          <div>
            {location.pathname !== "/home" && (
              <Link to={"/home"}>
                <button type="submit">Home</button>
              </Link>
            )}
            {userData.isAuthenticated && (
              <>
                {location.pathname !== "/favorites" && (
                  <Link to={"/favorites"}>
                    <button type="submit">Favorites</button>
                  </Link>
                )}
                {location.pathname !== "/profile" && (
                  <Link to={"/profile"}>
                    <button type="submit">Profile</button>
                  </Link>
                )}
              </>
            )}
            {location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <Link to={userData.isAuthenticated ? "/" : "/login"}>
                  <button
                    type="submit"
                    onClick={() =>
                      userData.isAuthenticated ? logout("/") : undefined
                    }
                  >
                    {userData.isAuthenticated ? "Logout" : "Login"}
                  </button>
                </Link>
              )}
          </div>
        </nav>
      </header>
      <h2>{headerName(location.pathname)}</h2>
    </>
  );
};

export default Header;
