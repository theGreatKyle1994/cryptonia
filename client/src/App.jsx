import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";

const App = () => {
  const [userData, setUserData] = useState({ username: "" });
  const checkAuth = () => sessionStorage.getItem("userData");

  useEffect(
    () => sessionStorage.setItem("userData", JSON.stringify(userData)),
    [userData]
  );

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
        <Route path="/login" element={<Form setUserData={setUserData} />} />
        <Route path="/register" element={<Form setUserData={setUserData} />} />
        <Route
          path="/profile"
          element={
            checkAuth() ? (
              <Form setUserData={setUserData} />
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
