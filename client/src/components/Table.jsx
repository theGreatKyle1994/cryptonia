import CryptoTable from "./CryptoTable";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { filterTable, filterFavs } from "../utilities/tableSorting";
import { globalContext } from "../App";

const Table = () => {
  const { cryptoData, favoriteList, currentFilter } = useContext(globalContext);
  const location = useLocation();
  const [filteredData, setFilteredData] = useState(
    filterTable(
      currentFilter,
      location.pathname == "/home"
        ? cryptoData
        : filterFavs(favoriteList, cryptoData)
    )
  );

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

  return <CryptoTable cryptoData={filteredData} />;
};

export default Table;
