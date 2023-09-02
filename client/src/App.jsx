import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import CryptoTable from "./components/CryptoTable";
import LoginRegForm from "./components/LoginRegForm";

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const currentPath = useLocation();

  const getCryptoData = () => {
    console.log("making api call");
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => setCryptoData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (
      currentPath.pathname == "/home" ||
      currentPath.pathname == "/favorites"
    ) {
      getCryptoData();
      const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
      return () => clearInterval(refreshCryptoData);
    }
  }, []);

  return (
    <>
      <Header />
      {currentPath.pathname == "/home" && <h2>Home</h2>}
      {currentPath.pathname == "/favorites" && <h2>Favorites</h2>}
      {currentPath.pathname == "/login-reg" && <h2>Login | Register</h2>}
      <Routes>
        <Route path="/home" element={<CryptoTable cryptoData={cryptoData} />} />
        <Route path="/login-reg" element={<LoginRegForm />} />
      </Routes>
    </>
  );
};

export default App;
