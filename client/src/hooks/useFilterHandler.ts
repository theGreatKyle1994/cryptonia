import type { Table } from "../types/app";
import { useState } from "react";

const useFilterHandler = (
  tableFilter: Table.TableData["tableFilter"],
  setTableData: React.Dispatch<React.SetStateAction<Table.TableData>>
): Table.FilterReturnData => {
  const [headers, setHeaders] = useState<Table.Headers>({
    name: "",
    symbol: "",
    price: "",
    change: "",
  });

  const filterHandler = (newFilter: Table.FilterName): void => {
    const symbolHandler = (): void => {
      const sym: Table.Symbol =
        headers[newFilter] == `\u2227` ? `\u2228` : `\u2227`;

      setHeaders({
        name: "",
        symbol: "",
        price: "",
        change: "",
        [newFilter]: sym,
      });
    };

    const filterObj = {
      name(): string {
        return tableFilter == "nameAsc" ? "nameDesc" : "nameAsc";
      },
      symbol(): string {
        return tableFilter == "symbolAsc" ? "symbolDesc" : "symbolAsc";
      },
      price(): string {
        return tableFilter == "priceAsc" ? "priceDesc" : "priceAsc";
      },
      change(): string {
        return tableFilter == "changeAsc" ? "changeDesc" : "changeAsc";
      },
    };

    setTableData((prevData) => ({
      ...prevData,
      tableFilter: filterObj[newFilter](),
    }));

    symbolHandler();
  };

  return [headers, filterHandler];
};

export default useFilterHandler;
