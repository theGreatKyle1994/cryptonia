import type { Table } from "../types/app";
import { useState } from "react";

type Symbols = Table.Symbols;
type TableData = Table.TableData;
type TableTitles = Table.TableTitles;
type TableFilters = Table.TableFilters;
type HeaderData = Table.HeaderData;
type FilterHandler = Table.FilterHandler;
type FilterReturnData = Table.FilterReturnData;

const useFilterHandler = (
  tableFilter: TableData["tableFilter"],
  setTableData: React.Dispatch<React.SetStateAction<TableData>>
): FilterReturnData => {
  const [headers, setHeaders] = useState<HeaderData>({
    name: "",
    symbol: "",
    price: "",
    change: "",
  });

  const filterHandler: FilterHandler = (filter: TableTitles): void => {
    const symbolHandler = (): void => {
      const sym: Symbols = headers[filter] == `\u2227` ? `\u2228` : `\u2227`;
      setHeaders({
        name: "",
        symbol: "",
        price: "",
        change: "",
        [filter]: sym,
      });
    };

    const filterHeaderObj: { [key in string]: () => TableFilters } = {
      name: () => (tableFilter == "nameAsc" ? "nameDesc" : "nameAsc"),
      symbol: () => (tableFilter == "symbolAsc" ? "symbolDesc" : "symbolAsc"),
      price: () => (tableFilter == "priceAsc" ? "priceDesc" : "priceAsc"),
      change: () => (tableFilter == "changeAsc" ? "changeDesc" : "changeAsc"),
    };
    setTableData((prevData) => ({
      ...prevData,
      tableFilter: filterHeaderObj[filter](),
    }));
    symbolHandler();
  };

  return [headers, filterHandler];
};

export default useFilterHandler;
