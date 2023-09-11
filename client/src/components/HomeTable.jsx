import CryptoTable from "./CryptoTable";
import { useEffect, useState, useContext } from "react";
import { filterTable } from "../utilities/tableSorting";
import { globalContext } from "../App";

const HomeTable = () => {
  const { cryptoData, currentFilter } = useContext(globalContext);
  const [filteredData, setFilteredData] = useState(
    filterTable(currentFilter, cryptoData)
  );

  useEffect(() => {
    setFilteredData(filterTable(currentFilter, cryptoData));
  }, [currentFilter, cryptoData]);

  return <CryptoTable cryptoData={filteredData} />;
};

export default HomeTable;
