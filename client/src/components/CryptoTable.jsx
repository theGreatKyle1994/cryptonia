import { useState, useEffect } from "react";
import axios from "axios";

const CryptoTable = ({ currentPath, userID }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [favoriteList, setFavoriteList] = useState([
    "bitcoin",
    "ethereum",
    "xrp",
  ]);

  const getCryptoData = async () => {
    if (currentPath == "/home") {
      axios
        .get("https://api.coincap.io/v2/assets")
        .then((res) => setCryptoData(res.data.data))
        .catch((err) => console.log(err));
    }
    if (currentPath == "/favorites") {
      const favList = [];
      for (let i = 0; i < favoriteList.length; i++) {
        const res = await axios
          .get(`https://api.coincap.io/v2/assets/${favoriteList[i]}`)
          .catch((err) => console.log(err));
        favList.push(res.data.data);
      }
      setCryptoData(favList);
    }
  };

  useEffect(() => {
    if (currentPath == "/favorites") {
      axios
        .get(`http://localhost:8000/user/${userID}`)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPath]);

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
    return () => clearInterval(refreshCryptoData);
  }, [currentPath]);

  useEffect(() => console.log(cryptoData), [cryptoData]);

  return (
    <>
      <table id="table-header">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24hr Change</th>
          </tr>
        </thead>
      </table>
      <div id="table-scroll-container">
        <table id="table-body">
          <tbody>
            {cryptoData &&
              cryptoData.map((crypto) => (
                <tr key={Math.random()}>
                  <td>{crypto.name}</td>
                  <td>{crypto.symbol}</td>
                  <td>${Number(crypto.priceUsd).toFixed(4)}</td>
                  <td
                    className={
                      crypto.changePercent24Hr < 0
                        ? "change-24hr-neg"
                        : "change-24hr-pos"
                    }
                  >
                    {Number(crypto.changePercent24Hr).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CryptoTable;
