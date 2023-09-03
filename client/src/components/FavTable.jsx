import CryptoTable from "./CryptoTable";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const FavTable = ({ userID, isAuthenticated }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const favoriteList = useRef([]);

  const getCryptoData = async (favList) => {
    const tempFavList = [];
    for (let i = 0; i < favList.length; i++) {
      const res = await axios
        .get(`https://api.coincap.io/v2/assets/${favList[i]}`)
        .catch((err) => console.log(err));
      tempFavList.push(res.data.data);
    }
    setCryptoData(tempFavList);
  };

  const getFavData = async () => {
    const res = await axios
      .get(`http://localhost:8000/user/${userID}`)
      .catch((err) => console.log(err));
    favoriteList.current = res.data;
    getCryptoData(favoriteList.current);
  };

  useEffect(() => {
    getFavData();
    const refreshCryptoData = setInterval(() => getFavData(), 5000);
    return () => clearInterval(refreshCryptoData);
  }, []);

  useEffect(() => console.log(cryptoData), [cryptoData]);

  return (
    <CryptoTable
      cryptoData={cryptoData}
      favoriteList={favoriteList.current}
      isAuthenticated={isAuthenticated}
      updateFavs={getFavData}
    />
  );
};

export default FavTable;
