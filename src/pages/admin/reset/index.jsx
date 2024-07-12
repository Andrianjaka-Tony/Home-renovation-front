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
import { FaTrash } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import useAdmin from "../../../hooks/useAdmin";
import setPageHead from "../../../helpers/page-helper";

function Reset() {
  useAdmin();

  const [isToast, setToast] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = () => {
    fetch(`${api}/api/admin/reset`)
      .then((response) => response.json())
      .then((response) => {
        const { status, message } = response;
        if (status == 200) {
          setMessage(message);
          setToast(true);
        }
      });
  };

  useEffect(() => {
    setPageHead({
      title: "Réinitialiser la base de données",
      description: "Page permettant de réinitialiser la base de données",
    });
  }, []);

  return (
    <div className="reset-admin page">
      <h1 className="page-title">Reinitialiser les donnees</h1>
      <div style={{ marginTop: "60px" }}></div>
      <Button text="Reinitialiser" icon={<FaTrash />} onClick={handleReset} />
      <AnimatePresence mode="wait">
        {isToast && <Toast text={message} setVisible={setToast} />}
      </AnimatePresence>
    </div>
  );
}

export default Reset;
