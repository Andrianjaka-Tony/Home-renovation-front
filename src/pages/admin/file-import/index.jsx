import "./style.scss";
import FileInput from "../../../components/file-input";
import { useEffect, useState } from "react";
import { api } from "../../../helpers/api-helper";
import { useNavigate } from "react-router-dom";
import { formatDate, formatTimestamp } from "../../../helpers/date-format-helper";
import Transition from "../../../components/transition";
import Button from "../../../components/button";
import Toast from "../../../components/toast";
import { formatPrice } from "../../../helpers/price-format-helper";
import { AiOutlineUpload } from "react-icons/ai";
import useAdmin from "../../../hooks/useAdmin";
import { AnimatePresence } from "framer-motion";

function FileImport() {
  useAdmin();

  const [page, setPage] = useState("1");

  const [houseWork, setHouseWork] = useState("");
  const [contract, setContract] = useState("");
  const [payment, setPayment] = useState("");

  const [message, setMessage] = useState("");
  const [isToast, setToast] = useState(false);

  const handleChange = (event, setter) => {
    const { target } = event;
    const [file] = target.files;
    // const { name, size } = file;
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const { result } = event.target;
      setter(result);
    });
    reader.readAsDataURL(file);
  };

  const handleSubmitHouse = (event) => {
    event.preventDefault();
    fetch(`${api}/api/admin/import/house-contract`, {
      method: "POST",
      body: JSON.stringify({ houseWork, contract }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message } = response;
        setMessage(message);
        setToast(true);
      });
  };

  const handleSubmitPayment = (event) => {
    event.preventDefault();
    fetch(`${api}/api/admin/import/payment`, {
      method: "POST",
      body: JSON.stringify({ payment }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message } = response;
        setMessage(message);
        setToast(true);
      });
  };

  return (
    <div className="admin-import page">
      <div className="page-title">Import de fichiers</div>
      <nav className="admin-import-nav">
        <p className={page != 1 ? "non-active" : ""} onClick={() => setPage(1)}>
          Maisons et devis
        </p>
        <p className={page != 2 ? "non-active" : ""} onClick={() => setPage(2)}>
          Paiements
        </p>
      </nav>
      {page == 1 && (
        <form className="admin-import-form" onSubmit={handleSubmitHouse}>
          <div className="admin-import-form-title">Importer les fichiers de maison et de devis</div>
          <FileInput
            id="house-work-input"
            label="Importer votre fichier house-work"
            onChange={(event) => handleChange(event, setHouseWork)}
          />
          <FileInput
            id="contract-input"
            label="Importer votre fichier de devis"
            onChange={(event) => handleChange(event, setContract)}
          />
          <Button text="Import" icon={<AiOutlineUpload />} type="submit" />
        </form>
      )}
      {page == 2 && (
        <form className="admin-import-form" onSubmit={handleSubmitPayment}>
          <div className="admin-import-form-title">Importer le fichier de paiement</div>
          <FileInput
            id="house-work-input"
            label="Importer votre fichier de paiement"
            onChange={(event) => handleChange(event, setPayment)}
          />
          <Button text="Import" icon={<AiOutlineUpload />} type="submit" />
        </form>
      )}
      <AnimatePresence mode="wait">
        {isToast && <Toast text={message} setVisible={setToast} />}
      </AnimatePresence>
    </div>
  );
}

export default FileImport;
