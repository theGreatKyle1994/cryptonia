import axios from "axios";

const CryptoTable = ({ cryptoData, favoriteList, isAuthenticated, userID }) => {
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
                  {isAuthenticated && (
                    <td>
                      <button
                        onClick={async () => {
                          await axios.put(`http://localhost:8000/user/fav`, {
                            id: userID,
                            fav: crypto.id,
                          });
                        }}
                      >
                        {/* {favoriteList.includes(crypto.id)
                          ? "Unfavorite"
                          : "Favorite"} */}
                        test
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CryptoTable;
