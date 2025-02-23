import { useState, useEffect, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import CryptoTable from "./components/CryptoTable";
import Form from "./components/Form";

export const globalContext = createContext();

const App = () => {
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData")) || {
      username: "",
      isAuthenticated: false,
    }
  );

  useEffect(() => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <globalContext.Provider value={{ userData, setUserData }}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<CryptoTable />} />
        <Route
          path="/favorites"
          element={
            userData.isAuthenticated ? <CryptoTable /> : <Navigate to="/" />
          }
        />
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<Form />} />
        <Route
          path="/profile"
          element={userData.isAuthenticated ? <Form /> : <Navigate to="/" />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </globalContext.Provider>
  );
};

export default App;
