import type { Table } from "../types/app";
import { useEffect } from "react";
import axios from "axios";

const useCryptoHandler = (
  setTableData: React.Dispatch<React.SetStateAction<Table.TableData>>
): void => {
  const getCryptoData = async (): Promise<void> => {
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
