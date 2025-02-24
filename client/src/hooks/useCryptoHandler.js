import { useEffect } from "react";
import axios from "axios";

const useCryptoHandler = (setTableData) => {
  const getCryptoData = async () => {
    await axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) =>
        setTableData((prevData) => ({ ...prevData, cryptoData: res.data.data }))
      )
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 10000);
    return () => clearInterval(refreshCryptoData);
  }, []);
};

export default useCryptoHandler;
