import axios from "axios";
import { useState } from "react";
import "./CryptoTable.css";

const CryptoTable = ({
  cryptoData,
  favoriteList,
  isAuthenticated,
  updateFavs,
  userID,
  updateFilter,
  filter,
}) => {
  const [symbols, setSymbols] = useState({});

  const symbolHandler = (type) => {
    const sym = symbols[type] == `\u2227` ? `	\u2228` : `\u2227`;
    setSymbols(() => {
      return { [type]: sym };
    });
    return symbols[type];
  };

  const filterHandler = (newFilter) => {
    const filterObj = {
      name() {
        return filter == "nameAsc" ? "nameDesc" : "nameAsc";
      },
      symbol() {
        return filter == "symbolAsc" ? "symbolDesc" : "symbolAsc";
      },
      price() {
        return filter == "priceAsc" ? "priceDesc" : "priceAsc";
      },
      change() {
        return filter == "changeAsc" ? "changeDesc" : "changeAsc";
      },
    };
    updateFilter(filterObj[newFilter]());
    symbolHandler(newFilter);
  };

  const adjustFavList = async (cryptoId, action) => {
    await axios.put(
      `http://localhost:8000/user/fav/${action == "remove" ? "remove" : ""}`,
      {
        id: userID,
        fav: cryptoId,
      }
    );
    updateFavs();
  };

  return (
    <>
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
            {isAuthenticated && <th>Actions</th>}
          </tr>
        </thead>
      </table>
      {cryptoData && cryptoData.length !== 0 ? (
        <div id="table-scroll-container">
          <table id="table-body">
            <tbody>
              {cryptoData &&
                cryptoData.map((crypto) => (
                  <tr key={Math.random()}>
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
                        <button
                          onClick={() =>
                            favoriteList.includes(crypto.id)
                              ? adjustFavList(crypto.id, "remove")
                              : adjustFavList(crypto.id, "add")
                          }
                        >
                          {favoriteList && favoriteList.includes(crypto.id)
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
        <h3>
          {favoriteList.length !== 0
            ? "Loading..."
            : "Add favorites to this list"}
        </h3>
      )}
    </>
  );
};

export default CryptoTable;
