import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HomeTable from "./components/HomeTable";
import FavTable from "./components/FavTable";
import LoginRegForm from "./components/LoginRegForm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [userID, setUserID] = useState("");
  const currentPath = useLocation();

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
              isAuthenticated={isAuthenticated}
              userID={userID}
              favoriteList={favoriteList}
              updateFavs={getFavData}
            />
          }
        />
        <Route
          path={"/favorites"}
          element={
            <FavTable
              isAuthenticated={isAuthenticated}
              userID={userID}
              favoriteList={favoriteList}
              updateFavs={getFavData}
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
    </>
  );
};

export default App;
