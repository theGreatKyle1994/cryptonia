import { globalContext } from "../App";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFilterHandler from "../hooks/useFilterHandler";
import useCryptoHandler from "../hooks/useCryptoHandler";
import useFavoriteHandler from "../hooks/useFavoriteHandler";
import CryptoModal from "./CryptoModal";
import { filterTable, filterFavs } from "../utilities/tableSorting";
import "./CryptoTable.css";

const CryptoTable = () => {
  const { userData } = useContext(globalContext);
  const [tableData, setTableData] = useState({
    cryptoData: [],
    modal: { id: "" },
    favoriteList: [],
    tableFilter: "none",
    filteredData: [],
  });
  const favoriteHandler = useFavoriteHandler(
    tableData.favoriteList,
    setTableData
  );
  const location = useLocation();
  const [symbols, filterHandler] = useFilterHandler(
    tableData.tableFilter,
    setTableData
  );

  useCryptoHandler(setTableData);

  useEffect(() => {
    setTableData((prevData) => ({
      ...prevData,
      filteredData: filterTable(
        tableData.tableFilter,
        location.pathname == "/home"
          ? tableData.cryptoData
          : filterFavs(tableData.favoriteList, tableData.cryptoData)
      ),
    }));
  }, [
    tableData.tableFilter,
    tableData.cryptoData,
    tableData.favoriteList,
    location.pathname,
  ]);

  return (
    <>
      <div id="table-container">
        <table id="table-header">
          <thead>
            <tr id="table-header-row">
              <th onClick={() => filterHandler("name")}>Name {symbols.name}</th>
              <th onClick={() => filterHandler("symbol")}>
                Symbol {symbols.symbol}
              </th>
              <th onClick={() => filterHandler("price")}>
                Price {symbols.price}
              </th>
              <th onClick={() => filterHandler("change")}>
                24hr Change {symbols.change}
              </th>
              {userData.isAuthenticated && <th id="actions-tab">Actions</th>}
            </tr>
          </thead>
        </table>
        {tableData.filteredData && tableData.filteredData.length !== 0 ? (
          <div id="table-scroll-container">
            <table id="table-body">
              <tbody>
                {tableData.filteredData.map((crypto) => (
                  <tr
                    key={Math.random()}
                    onClick={() =>
                      setTableData((prevData) => ({
                        ...prevData,
                        modal: { id: crypto.id },
                      }))
                    }
                    id={tableData.modal.id == crypto.id ? "row-selected" : ""}
                  >
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
                    {userData.isAuthenticated && tableData.favoriteList && (
                      <td>
                        <button onClick={(e) => favoriteHandler(e, crypto)}>
                          {tableData.favoriteList.includes(crypto.id)
                            ? "Unfavorite"
                            : "Favorite"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 id="await-data-header">
            {location.pathname == "/home"
              ? "Loading Crypto Data..."
              : !tableData.favoriteList.length
              ? "Add favorites to this list"
              : "Loading Favorites..."}
          </h3>
        )}
      </div>
      <CryptoModal tableData={tableData} setTableData={setTableData} />
    </>
  );
};

export default CryptoTable;
