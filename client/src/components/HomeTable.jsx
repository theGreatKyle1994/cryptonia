import CryptoTable from "./CryptoTable";
import axios from "axios";
import { useEffect, useState } from "react";

const HomeTable = ({ favoriteList, isAuthenticated, updateFavs, userID }) => {
  const [cryptoData, setCryptoData] = useState([]);

  const getCryptoData = () => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => setCryptoData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
    return () => clearInterval(refreshCryptoData);
  }, []);

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

export default HomeTable;
