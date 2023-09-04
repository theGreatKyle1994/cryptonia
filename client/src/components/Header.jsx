import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ isAuthenticated, currentPath, authenticate }) => {
  const navigate = useNavigate();

  const logout = () => {
    authenticate(false);
    navigate("/home");
  };

  return (
    <header>
      <h1>Cryptonia</h1>
      <nav>
        {currentPath == "/home" && !isAuthenticated && (
          <Link to={"/login-reg"}>
            <button type="submit">Login | Register</button>
          </Link>
        )}
        {currentPath == "/home" && isAuthenticated && (
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
        {currentPath == "/favorites" && isAuthenticated && (
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
        {currentPath == "/login-reg" && (
          <Link to={"/home"}>
            <button type="submit">Home</button>
          </Link>
        )}
        {currentPath == "/profile" && (
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
