import { useState, useEffect, useContext } from "react";
import { globalContext } from "../App";
import "./CryptoModal.css";

const CryptoModal = ({ cryptoId }) => {
  const { cryptoData, setModal } = useContext(globalContext);
  const [crypto, setCrypto] = useState([]);

  useEffect(
    () => setCrypto(cryptoData.filter((crypto) => crypto.id == cryptoId)[0]),
    [cryptoData, cryptoId]
  );

  return (
    <div id="modal-container">
      <div className="modal-seperator">
        <div>Name:</div>
        <div>{crypto.name}</div>
      </div>
      <div className="modal-seperator">
        <div>Price:</div>
        <div>${Number(crypto.priceUsd).toFixed(4)}</div>
      </div>
      <div className="modal-seperator">
        <div>Volume:</div>
        <div>${Number(crypto.volumeUsd24Hr).toFixed(4)}</div>
      </div>
      <div className="modal-seperator">
        <div>Supply:</div>
        <div>{Number(crypto.supply).toFixed(4)}</div>
      </div>
      <div className="modal-seperator">
        <div>Max Supply:</div>
        <div>
          {crypto.maxSupply ? Number(crypto.maxSupply).toFixed(4) : "None"}
        </div>
      </div>
      <div className="modal-seperator">
        <div>Market Cap:</div>
        <div>${Number(crypto.marketCapUsd).toFixed(4)}</div>
      </div>
      <div
        id="close-btn"
        onClick={() => setModal({ isEnabled: false, id: "" })}
      >
        X
      </div>
    </div>
  );
};

export default CryptoModal;
