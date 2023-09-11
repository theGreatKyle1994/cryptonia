import { createContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HomeTable from "./components/HomeTable";
import FavTable from "./components/FavTable";
import LoginRegForm from "./components/LoginRegForm";
import CryptoModal from "./components/CryptoModal";
import UpdateProfile from "./components/UpdateProfile";
export const globalContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [userID, setUserID] = useState("");
  const [cryptoData, setCryptoData] = useState([]);
  const [modal, setModal] = useState({ isEnabled: false, id: "" });
  const currentPath = useLocation();

  const getCryptoData = async () => {
    await axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => setCryptoData(res.data.data))
      .catch((err) => console.log(err));
  };

  const checkSession = () => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      setIsAuthenticated(true);
      setUserID(id);
    }
  };

  const getFavData = async () => {
    const res = await axios
      .get(`http://localhost:8000/api/user/${userID}`)
      .catch((err) => console.log(err));
    if (res) {
      setFavoriteList(res.data);
    }
  };

  const headerName = (path) => {
    switch (path) {
      case "/home":
        return "Home";
      case "/favorites":
        return "Favorites";
      case "/login-reg":
        return "Login | Register";
      case "/profile":
        return "Profile";
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const getData = async () => getFavData();
      getData();
    }
  }, [userID]);

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
    return () => clearInterval(refreshCryptoData);
  }, []);

  useEffect(() => checkSession(), []);

  return (
    <globalContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        favoriteList,
        getFavData,
        currentFilter,
        setCurrentFilter,
        userID,
        setUserID,
        cryptoData,
        setCryptoData,
        modal,
        setModal,
        currentPath,
      }}
    >
      <Header />
      <h2>{headerName(currentPath.pathname)}</h2>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeTable />} />
        <Route path="/favorites" element={<FavTable />} />
        <Route path="/login-reg" element={<LoginRegForm />} />
        <Route path="/profile" element={<UpdateProfile />} />
      </Routes>
      {(currentPath.pathname == "/home" ||
        currentPath.pathname == "/favorites") &&
        modal.isEnabled && <CryptoModal cryptoId={modal.id} />}
    </globalContext.Provider>
  );
};

export default App;
