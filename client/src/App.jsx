import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import CryptoTable from "./components/CryptoTable";
import LoginRegForm from "./components/LoginRegForm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState("");
  const currentPath = useLocation();

  const headerName = (path) => {
    switch (path) {
      case "/home":
        return "Home";
      case "/favorites":
        return "Favorites";
      case "/login-reg":
        return "Login | Register";
    }
  };

  useEffect(
    () => console.log("Authenticated: " + isAuthenticated),
    [isAuthenticated]
  );

  useEffect(() => console.log(userID), [userID]);

  return (
    <>
      <Header
        authenticate={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        currentPath={currentPath.pathname}
      />
      <h2>{headerName(currentPath.pathname)}</h2>
      <Routes>
        {["/home", "/favorites"].map((path, i) => (
          <Route
            key={i}
            path={path}
            element={
              <CryptoTable currentPath={currentPath.pathname} userID={userID} />
            }
          />
        ))}
        <Route
          path="/login-reg"
          element={
            <LoginRegForm
              setUserID={setUserID}
              authenticate={setIsAuthenticated}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
