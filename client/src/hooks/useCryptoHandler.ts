import type { Table } from "../types/app";
import { useEffect } from "react";
import axios from "axios";

const useCryptoHandler = (
  setTableData: React.Dispatch<React.SetStateAction<Table.TableData>>
): void => {
  const getCryptoData = async (): Promise<void> => {
    await axios
      .get(
        `https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_API_KEY}`
      )
      .then((res) =>
        setTableData((prevData) => ({ ...prevData, cryptoData: res.data.data }))
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCryptoData();
    const refreshCryptoData = setInterval(() => getCryptoData(), 30000);
    return () => clearInterval(refreshCryptoData);
  }, []);
};

export default useCryptoHandler;
