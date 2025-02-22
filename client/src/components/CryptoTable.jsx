import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { globalContext } from "../App";
import useLogout from "../hooks/useLogout";
import "./CryptoTable.css";

const CryptoTable = ({
  cryptoData,
  favoriteList,
  currentFilter,
  setCurrentFilter,
  modal,
  setModal,
  getFavData,
}) => {
  const { userData } = useContext(globalContext);
  const [symbols, setSymbols] = useState({});
  const logout = useLogout();
  const location = useLocation();

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
        return currentFilter == "nameAsc" ? "nameDesc" : "nameAsc";
      },
      symbol() {
        return currentFilter == "symbolAsc" ? "symbolDesc" : "symbolAsc";
      },
      price() {
        return currentFilter == "priceAsc" ? "priceDesc" : "priceAsc";
      },
      change() {
        return currentFilter == "changeAsc" ? "changeDesc" : "changeAsc";
      },
    };
    setCurrentFilter(filterObj[newFilter]());
    symbolHandler(newFilter);
  };

  const favoriteHandler = async (e, crypto) => {
    e.stopPropagation();
    await axios[`${favoriteList.includes(crypto.id) ? "put" : "post"}`](
      `${import.meta.env.VITE_BACKEND_URL}/api/user/fav`,
      { fav: crypto.id },
      { withCredentials: true }
    ).catch(() => logout("/login"));
    getFavData();
  };

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
            {userData.isAuthenticated && <th id="actions-tab">Actions</th>}
          </tr>
        </thead>
      </table>
      {cryptoData && cryptoData.length !== 0 ? (
        <div id="table-scroll-container">
          <table id="table-body">
            <tbody>
              {cryptoData &&
                cryptoData.map((crypto) => (
                  <tr
                    key={Math.random()}
                    onClick={() => setModal({ id: crypto.id })}
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
                    {userData.isAuthenticated && favoriteList && (
                      <td>
                        <button onClick={(e) => favoriteHandler(e, crypto)}>
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
