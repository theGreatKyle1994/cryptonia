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
  const [favoriteList, setFavoriteList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [cryptoData, setCryptoData] = useState([]);
  const [userData, setUserData] = useState(undefined);
  const [modal, setModal] = useState({ isEnabled: false, id: "" });
  const currentPath = useLocation();

  const getCryptoData = async () => {
    await axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => setCryptoData(res.data.data))
      .catch((err) => console.log(err));
  };

  const getFavData = async () => {
    if (userData) {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/fav`, {
          withCredentials: true,
        })
        .then((res) => setFavoriteList(res.data))
        .catch(() => setUserData(undefined));
    }
  };

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

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
    setUserData(JSON.parse(sessionStorage.getItem("userData")));
    return () => clearInterval(refreshCryptoData);
  }, []);

  useEffect(() => {
    (async () => getFavData())();
  }, [JSON.stringify(userData)]);

  return (
    <globalContext.Provider
      value={{
        favoriteList,
        getFavData,
        currentFilter,
        setCurrentFilter,
        cryptoData,
        userData,
        setUserData,
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
        <Route
          path="/favorites"
          element={checkAuth() ? <FavTable /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<LoginRegForm />} />
        <Route path="/register" element={<LoginRegForm />} />
        <Route
          path="/profile"
          element={checkAuth() ? <UpdateProfile /> : <Navigate to="/" />}
        />
      </Routes>
      {(currentPath.pathname == "/home" ||
        currentPath.pathname == "/favorites") &&
        modal.isEnabled && <CryptoModal cryptoId={modal.id} />}
    </globalContext.Provider>
  );
};

export default App;
