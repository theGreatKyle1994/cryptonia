import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Table from "./components/Table";
import LoginRegForm from "./components/LoginRegForm";
import UpdateProfile from "./components/UpdateProfile";

const App = () => {
  const [userData, setUserData] = useState(undefined);
  const checkAuth = () => sessionStorage.getItem("userData");

  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
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
        <Route
          path="/login"
          element={<LoginRegForm setUserData={setUserData} />}
        />
        <Route
          path="/register"
          element={<LoginRegForm setUserData={setUserData} />}
        />
        <Route
          path="/profile"
          element={
            checkAuth() ? (
              <UpdateProfile setUserData={setUserData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
