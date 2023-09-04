import CryptoTable from "./CryptoTable";
import { useNavigate } from "react-router-dom";
import { filterTable, filterFavs } from "../utilities/tableSorting";
import { useEffect, useState, useContext } from "react";
import { globalContext } from "../App";

const FavTable = () => {
  const { cryptoData, favoriteList, isAuthenticated, currentFilter } =
    useContext(globalContext);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(
    filterTable(currentFilter, filterFavs(favoriteList, cryptoData))
  );

  useEffect(() => {
    setFilteredData(
      filterTable(currentFilter, filterFavs(favoriteList, cryptoData))
    );
  }, [currentFilter, cryptoData, favoriteList]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, []);

  return <CryptoTable cryptoData={filteredData} />;
};

export default FavTable;
