import type { Table, Modal } from "../types/app";
import { useState, useEffect } from "react";
import "./CryptoModal.css";

const CryptoModal: React.FC<Modal.ModalProps> = ({
  tableData: { modal, cryptoData },
  setTableData,
}): React.ReactElement | undefined => {
  const [crypto, setCrypto] = useState<Table.Crypto | undefined>(undefined);

  useEffect(
    () => setCrypto(cryptoData.filter((crypto) => crypto.id == modal.id)[0]),
    [cryptoData, modal.id]
  );

  return (
    crypto && (
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
          onClick={() =>
            setTableData((prevData) => ({ ...prevData, modal: { id: "" } }))
          }
        >
          X
        </div>
      </div>
    )
  );
};

export default CryptoModal;
