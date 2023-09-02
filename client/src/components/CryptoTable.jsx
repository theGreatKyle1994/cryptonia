import { useState, useEffect } from "react";
import axios from "axios";

const CryptoTable = ({ currentPath }) => {
  const [cryptoData, setCryptoData] = useState([]);

  const getCryptoData = () => {
    console.log("making api call");
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => setCryptoData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (currentPath.pathname == "/home") {
      getCryptoData();
      const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
      return () => clearInterval(refreshCryptoData);
    }
  }, []);

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
              cryptoData.map((crypto, index) => {
                return (
                  <tr key={index}>
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
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CryptoTable;
