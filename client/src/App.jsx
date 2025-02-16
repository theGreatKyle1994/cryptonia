import { createContext, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Table from "./components/Table";
import LoginRegForm from "./components/LoginRegForm";
import UpdateProfile from "./components/UpdateProfile";
export const globalContext = createContext();

const App = () => {
  const [userData, setUserData] = useState(undefined);
  const location = useLocation();

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

  const checkAuth = () => (sessionStorage.getItem("userData") ? true : false);

  return (
    <globalContext.Provider value={{ userData, setUserData }}>
      <Header />
      <h2>{headerName(location.pathname)}</h2>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<Table userData={userData} setUserData={setUserData} />}
        />
        <Route
          path="/favorites"
          element={
            checkAuth() ? (
              <Table userData={userData} setUserData={setUserData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/login" element={<LoginRegForm />} />
        <Route path="/register" element={<LoginRegForm />} />
        <Route
          path="/profile"
          element={checkAuth() ? <UpdateProfile /> : <Navigate to="/" />}
        />
      </Routes>
    </globalContext.Provider>
  );
};

export default App;
