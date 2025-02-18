import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";

const App = () => {
  const [userData, setUserData] = useState({
    username: "",
    isAuthenticated: false,
  });

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userData"));
    if (data) setUserData(data);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

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
            userData.isAuthenticated ? (
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
            userData.isAuthenticated ? (
              <Form setUserData={setUserData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
