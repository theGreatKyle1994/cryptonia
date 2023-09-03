import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomeTable from "./components/HomeTable";
import FavTable from "./components/FavTable";
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

  return (
    <>
      <Header
        authenticate={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        currentPath={currentPath.pathname}
      />
      <h2>{headerName(currentPath.pathname)}</h2>
      <Routes>
        <Route
          path={"/home"}
          element={
            <HomeTable isAuthenticated={isAuthenticated} userID={userID} />
          }
        />
        <Route
          path={"/favorites"}
          element={
            <FavTable isAuthenticated={isAuthenticated} userID={userID} />
          }
        />
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
