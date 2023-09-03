import CryptoTable from "./CryptoTable";
import filterTable from "../utilities/tableSorting";
import axios from "axios";
import { useEffect, useState } from "react";

const FavTable = ({
  favoriteList,
  isAuthenticated,
  updateFavs,
  userID,
  filter,
  updateFilter,
}) => {
  const [cryptoData, setCryptoData] = useState([]);

  const getCryptoData = async () => {
    const tempFavList = [];
    for (let i = 0; i < favoriteList.length; i++) {
      const res = await axios
        .get(`https://api.coincap.io/v2/assets/${favoriteList[i]}`)
        .catch((err) => console.log(err));
      tempFavList.push(res.data.data);
    }
    setCryptoData(filterTable(filter, tempFavList));
  };

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
    return () => clearInterval(refreshCryptoData);
  }, [favoriteList, filter]);

  return (
    <CryptoTable
      cryptoData={cryptoData}
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
