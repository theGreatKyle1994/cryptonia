import CryptoTable from "./CryptoTable";
import { filterTable, filterFavs } from "../utilities/tableSorting";
import { useEffect, useState, useContext } from "react";
import { globalContext } from "../App";

const FavTable = () => {
  const { cryptoData, favoriteList, currentFilter } = useContext(globalContext);
  const [filteredData, setFilteredData] = useState(
    filterTable(currentFilter, filterFavs(favoriteList, cryptoData))
  );

  useEffect(() => {
    setFilteredData(
      filterTable(currentFilter, filterFavs(favoriteList, cryptoData))
    );
  }, [currentFilter, cryptoData, favoriteList]);

  return <CryptoTable cryptoData={filteredData} />;
};

export default FavTable;
