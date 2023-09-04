import CryptoTable from "./CryptoTable";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState(
    filterTable(filter, filterFavs(favoriteList, cryptoData))
  );

  useEffect(() => {
    setFilteredData(filterTable(filter, filterFavs(favoriteList, cryptoData)));
  }, [filter, cryptoData, favoriteList]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, []);

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
