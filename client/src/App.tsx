import { useState, useEffect, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";
export const globalContext = createContext({});

const App = (): JSX.Element => {
  const [userData, setUserData] = useState<{
    username: string;
    isAuthenticated: boolean;
  }>(
    JSON.parse(sessionStorage.getItem("userData")!) || {
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
        <Route path="/home" element={<Table />} />
        <Route
          path="/favorites"
          element={userData.isAuthenticated ? <Table /> : <Navigate to="/" />}
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
