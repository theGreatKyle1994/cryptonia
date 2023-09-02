import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Cryptonia</h1>
      <nav>
        <Link to={"/login-reg"}>
          <button type="submit">Login | Register</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
