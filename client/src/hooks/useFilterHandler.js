import { useState } from "react";

const useFilterHandler = (tableFilter, setTableData) => {
  const [symbols, setSymbols] = useState({});

  const filterHandler = (newFilter) => {
    const symbolHandler = (type) => {
      const sym = symbols[type] == `\u2227` ? `	\u2228` : `\u2227`;
      setSymbols(() => {
        return { [type]: sym };
      });
      return symbols[type];
    };
    const filterObj = {
      name() {
        return tableFilter == "nameAsc" ? "nameDesc" : "nameAsc";
      },
      symbol() {
        return tableFilter == "symbolAsc" ? "symbolDesc" : "symbolAsc";
      },
      price() {
        return tableFilter == "priceAsc" ? "priceDesc" : "priceAsc";
      },
      change() {
        return tableFilter == "changeAsc" ? "changeDesc" : "changeAsc";
      },
    };
    setTableData((prevData) => ({
      ...prevData,
      tableFilter: filterObj[newFilter](),
    }));
    symbolHandler(newFilter);
  };
  return [symbols, filterHandler];
};

export default useFilterHandler;
