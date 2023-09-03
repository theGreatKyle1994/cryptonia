import CryptoTable from "./CryptoTable";
import axios from "axios";
import { useEffect, useState } from "react";

const FavTable = ({ favoriteList, isAuthenticated, updateFavs, userID }) => {
  const [cryptoData, setCryptoData] = useState([]);

  const getCryptoData = async () => {
    const tempFavList = [];
    for (let i = 0; i < favoriteList.length; i++) {
      const res = await axios
        .get(`https://api.coincap.io/v2/assets/${favoriteList[i]}`)
        .catch((err) => console.log(err));
      tempFavList.push(res.data.data);
    }
    setCryptoData(tempFavList);
  };

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
    return () => clearInterval(refreshCryptoData);
  }, [favoriteList]);

  return (
    <CryptoTable
      cryptoData={cryptoData}
      favoriteList={favoriteList}
      isAuthenticated={isAuthenticated}
      updateFavs={updateFavs}
      userID={userID}
    />
  );
};

export default FavTable;
