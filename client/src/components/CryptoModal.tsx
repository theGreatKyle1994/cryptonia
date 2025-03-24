import type { Modal } from "../types/app";
import "./CryptoModal.css";

const CryptoModal: React.FC<Modal.ModalProps> = ({
  tableData: {
    modal: { id },
    cryptoData,
  },
  setTableData,
}): React.ReactElement => {
  const crypto = cryptoData.filter((crypto) => crypto.id == id)[0];

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
        onClick={() =>
          setTableData((prevData) => ({ ...prevData, modal: { id: "" } }))
        }
      >
        X
      </div>
    </div>
  );
};

export default CryptoModal;
