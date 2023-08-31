import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import CryptoTable from "./components/CryptoTable";

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);

  const getCryptoData = () => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => {
        console.log(res.data.data);
        setCryptoData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 5000);
    return () => clearInterval(refreshCryptoData);
  }, []);

  return (
    <>
      <Header />
      <h2>Home</h2>
      <CryptoTable cryptoData={cryptoData} />
    </>
  );
};

export default App;
