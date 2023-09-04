import CryptoTable from "./CryptoTable";
import { useEffect, useState } from "react";
import { filterTable } from "../utilities/tableSorting";

const HomeTable = ({
  cryptoData,
  favoriteList,
  isAuthenticated,
  updateFavs,
  userID,
  filter,
  updateFilter,
}) => {
  const [filteredData, setFilteredData] = useState(
    filterTable(filter, cryptoData)
  );

  useEffect(() => {
    setFilteredData(filterTable(filter, cryptoData));
  }, [filter, cryptoData]);

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

export default HomeTable;
