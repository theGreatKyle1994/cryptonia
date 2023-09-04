import CryptoTable from "./CryptoTable";
import { filterTable, filterFavs } from "../utilities/tableSorting";
import { useEffect, useState } from "react";

const FavTable = ({
  cryptoData,
  favoriteList,
  isAuthenticated,
  updateFavs,
  userID,
  filter,
  updateFilter,
}) => {
  const [filteredData, setFilteredData] = useState(
    filterTable(filter, filterFavs(favoriteList, cryptoData))
  );

  useEffect(() => {
    setFilteredData(filterTable(filter, filterFavs(favoriteList, cryptoData)));
  }, [filter, cryptoData, favoriteList]);

  return (
    <CryptoTable
      cryptoData={filteredData}
      favoriteList={favoriteList}
      isAuthenticated={isAuthenticated}
      updateFavs={updateFavs}
      userID={userID}
      updateFilter={updateFilter}
      filter={filter}
    />
  );
};

export default FavTable;
