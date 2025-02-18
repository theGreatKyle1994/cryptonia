import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ userData, setUserData }) => {
  const location = useLocation();

  const logout = () => setUserData({ username: "" });

  const headerName = (path) => {
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
    }
  };

  return (
    <>
      <header>
        <h1>Cryptonia</h1>
        <nav>
          {userData.username && (
            <span id="welcome-user">Signed-In: {userData.username}</span>
          )}
          <div>
            {location.pathname !== "/home" && (
              <Link to={"/home"}>
                <button>Home</button>
              </Link>
            )}
            {userData.username && (
              <>
                {location.pathname !== "/favorites" && (
                  <Link to={"/favorites"}>
                    <button>Favorites</button>
                  </Link>
                )}
                {location.pathname !== "/profile" && (
                  <Link to={"/profile"}>
                    <button>Profile</button>
                  </Link>
                )}
              </>
            )}
            {location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <Link to={userData.username ? "/" : "/login"}>
                  <button onClick={userData.username ? logout : undefined}>
                    {userData.username ? "Logout" : "Login"}
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
