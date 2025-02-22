import CryptoTable from "./CryptoTable";
import CryptoModal from "./CryptoModal";
import { globalContext } from "../App";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import axios from "axios";
import { filterTable, filterFavs } from "../utilities/tableSorting";

const Table = () => {
  const {
    userData: { isAuthenticated },
  } = useContext(globalContext);
  const location = useLocation();
  const logout = useLogout();
  const [cryptoData, setCryptoData] = useState([]);
  const [modal, setModal] = useState({ id: "" });
  const [favoriteList, setFavoriteList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [filteredData, setFilteredData] = useState(
    filterTable(
      currentFilter,
      location.pathname == "/home"
        ? cryptoData
        : filterFavs(favoriteList, cryptoData)
    )
  );

  const getCryptoData = async () => {
    await axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => setCryptoData(res.data.data))
      .catch((err) => console.log(err));
  };

  const getFavData = async () => {
    if (isAuthenticated) {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/fav`, {
          withCredentials: true,
        })
        .then((res) => setFavoriteList(res.data))
        .catch(() => logout("/login"));
    }
  };

  useEffect(() => {
    setFilteredData(
      filterTable(
        currentFilter,
        location.pathname == "/home"
          ? cryptoData
          : filterFavs(favoriteList, cryptoData)
      )
    );
  }, [
    currentFilter,
    cryptoData,
    location.pathname == "/home" ? "" : favoriteList,
  ]);

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
    return () => clearInterval(refreshCryptoData);
  }, []);

  useEffect(() => {
    (async () => await getFavData())();
  }, [isAuthenticated]);

  return (
    <>
      <CryptoTable
        cryptoData={filteredData}
        favoriteList={favoriteList}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        modal={modal}
        setModal={setModal}
        getFavData={getFavData}
      />
      <CryptoModal modal={modal} cryptoData={cryptoData} setModal={setModal} />
    </>
  );
};

export default Table;
