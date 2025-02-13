import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { globalContext } from "../App";
import "./CryptoTable.css";

const CryptoTable = ({ cryptoData }) => {
  const {
    modal,
    setModal,
    favoriteList,
    getFavData,
    userData,
    setUserData,
    setCurrentFilter,
    currentFilter,
  } = useContext(globalContext);
  const [symbols, setSymbols] = useState({});
  const navigate = useNavigate();
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

  const favoriteHandler = (e, crypto) => {
    e.stopPropagation();
    const adjustFavList = async (cryptoId, action) => {
      switch (action) {
        case "remove":
          await axios
            .put(
              `${import.meta.env.VITE_BACKEND_URL}/api/user/fav`,
              { fav: cryptoId },
              {
                withCredentials: true,
              }
            )
            .catch(() => {
              sessionStorage.clear();
              setUserData(undefined);
              navigate("/login-reg");
            });
          break;
        case "add":
          await axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/api/user/fav`,
              {
                fav: cryptoId,
              },
              { withCredentials: true }
            )
            .catch(() => {
              sessionStorage.clear();
              setUserData(undefined);
              navigate("/login-reg");
            });
          break;
      }
      getFavData();
    };
    favoriteList.includes(crypto.id)
      ? adjustFavList(crypto.id, "remove")
      : adjustFavList(crypto.id, "add");
  };

  const selectionHandler = (crypto) =>
    setModal({ isEnabled: true, id: crypto.id });

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
            {userData && <th id="actions-tab">Actions</th>}
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
                    onClick={() => selectionHandler(crypto)}
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
                    {userData && favoriteList && (
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
