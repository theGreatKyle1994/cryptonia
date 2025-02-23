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
  const [tableData, setTableData] = useState({
    cryptoData: [],
    modal: { id: "" },
    favoriteList: [],
    tableFilter: "none",
    filteredData: [],
  });

  const getCryptoData = async () => {
    await axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) =>
        setTableData((prevData) => ({ ...prevData, cryptoData: res.data.data }))
      )
      .catch((err) => console.log(err));
  };

  const getFavData = async () => {
    if (isAuthenticated) {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/fav`, {
          withCredentials: true,
        })
        .then((res) =>
          setTableData((prevData) => ({ ...prevData, favoriteList: res.data }))
        )
        .catch(() => logout("/login"));
    }
  };

  useEffect(() => {
    setTableData((prevData) => ({
      ...prevData,
      filteredData: filterTable(
        tableData.tableFilter,
        location.pathname == "/home"
          ? tableData.cryptoData
          : filterFavs(tableData.favoriteList, tableData.cryptoData)
      ),
    }));
  }, [
    tableData.tableFilter,
    tableData.cryptoData,
    tableData.favoriteList,
    location.pathname,
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
        tableData={tableData}
        setTableData={setTableData}
        getFavData={getFavData}
      />
      <CryptoModal tableData={tableData} setTableData={setTableData} />
    </>
  );
};

export default Table;
