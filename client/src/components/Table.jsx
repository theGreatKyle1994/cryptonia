import CryptoTable from "./CryptoTable";
import CryptoModal from "./CryptoModal";
import { globalContext } from "../App";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useCryptoHandler from "../hooks/useCryptoHandler";
import axios from "axios";
import { filterTable, filterFavs } from "../utilities/tableSorting";

const Table = () => {
  const {
    userData: { isAuthenticated },
  } = useContext(globalContext);
  const [tableData, setTableData] = useState({
    cryptoData: [],
    modal: { id: "" },
    favoriteList: [],
    tableFilter: "none",
    filteredData: [],
  });
  useCryptoHandler(setTableData);
  const location = useLocation();
  const logout = useLogout();

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

  const favoriteHandler = async (e, crypto) => {
    e.stopPropagation();
    await axios[
      `${tableData.favoriteList.includes(crypto.id) ? "put" : "post"}`
    ](
      `${import.meta.env.VITE_BACKEND_URL}/api/user/fav`,
      { fav: crypto.id },
      { withCredentials: true }
    ).catch(() => logout("/login"));
    getFavData();
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
    (async () => await getFavData())();
  }, [isAuthenticated]);

  return (
    <>
      <CryptoTable
        tableData={tableData}
        setTableData={setTableData}
        favoriteHandler={favoriteHandler}
      />
      <CryptoModal tableData={tableData} setTableData={setTableData} />
    </>
  );
};

export default Table;
