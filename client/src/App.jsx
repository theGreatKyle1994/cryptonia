import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HomeTable from "./components/HomeTable";
import FavTable from "./components/FavTable";
import LoginRegForm from "./components/LoginRegForm";
import CryptoModal from "./components/CryptoModal";

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

  const getFavData = async () => {
    const res = await axios
      .get(`http://localhost:8000/user/${userID}`)
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

  return (
    <>
      <Header
        authenticate={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        currentPath={currentPath.pathname}
      />
      <h2>{headerName(currentPath.pathname)}</h2>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route
          path={"/home"}
          element={
            <HomeTable
              modalId={modal.id}
              setModal={setModal}
              cryptoData={cryptoData}
              isAuthenticated={isAuthenticated}
              userID={userID}
              favoriteList={favoriteList}
              updateFavs={getFavData}
              updateFilter={setCurrentFilter}
              filter={currentFilter}
            />
          }
        />
        <Route
          path={"/favorites"}
          element={
            <FavTable
              modalId={modal.id}
              setModal={setModal}
              cryptoData={cryptoData}
              isAuthenticated={isAuthenticated}
              userID={userID}
              favoriteList={favoriteList}
              updateFavs={getFavData}
              updateFilter={setCurrentFilter}
              filter={currentFilter}
            />
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
      {(currentPath.pathname == "/home" ||
        currentPath.pathname == "/favorites") &&
        modal.isEnabled && (
          <CryptoModal
            cryptoData={cryptoData}
            cryptoId={modal.id}
            setModal={setModal}
          />
        )}
    </>
  );
};

export default App;
