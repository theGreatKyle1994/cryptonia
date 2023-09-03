import axios from "axios";
import "./CryptoTable.css";

const CryptoTable = ({
  cryptoData,
  favoriteList,
  isAuthenticated,
  updateFavs,
  userID,
}) => {
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
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24hr Change</th>
            {isAuthenticated && <th>Actions</th>}
          </tr>
        </thead>
      </table>
      {cryptoData.length !== 0 ? (
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
