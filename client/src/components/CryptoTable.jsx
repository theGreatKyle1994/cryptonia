import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../App";
import useFilterHandler from "../hooks/useFilterHandler";
import "./CryptoTable.css";

const CryptoTable = ({
  tableData: { favoriteList, modal, filteredData, tableFilter },
  setTableData,
  favoriteHandler,
}) => {
  const {
    userData: { isAuthenticated },
  } = useContext(globalContext);
  const location = useLocation();
  const [symbols, filterHandler] = useFilterHandler(tableFilter, setTableData);

  return (
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
            {isAuthenticated && <th id="actions-tab">Actions</th>}
          </tr>
        </thead>
      </table>
      {filteredData && filteredData.length !== 0 ? (
        <div id="table-scroll-container">
          <table id="table-body">
            <tbody>
              {filteredData.map((crypto) => (
                <tr
                  key={Math.random()}
                  onClick={() =>
                    setTableData((prevData) => ({
                      ...prevData,
                      modal: { id: crypto.id },
                    }))
                  }
                  id={modal.id == crypto.id ? "row-selected" : ""}
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
                  {isAuthenticated && favoriteList && (
                    <td>
                      <button onClick={(e) => favoriteHandler(e, crypto)}>
                        {favoriteList.includes(crypto.id)
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
            : !favoriteList.length
            ? "Add favorites to this list"
            : "Loading Favorites..."}
        </h3>
      )}
    </div>
  );
};

export default CryptoTable;
