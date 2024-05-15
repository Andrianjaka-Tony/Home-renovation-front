import { useEffect, useState } from "react";
import "./style.scss";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { AiOutlineDownload, AiOutlinePlus } from "react-icons/ai";
import { api } from "../../../helpers/api-helper";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Toast from "../../../components/toast";
import { formatDate, formatTimestamp } from "../../../helpers/date-format-helper";
import Transition from "../../../components/transition";
import { formatPrice } from "../../../helpers/price-format-helper";
import useClient from "../../../hooks/useClient";
import { FaEye } from "react-icons/fa";
import PdfPreview from "./pdf-preview";

function ClientHome() {
  useClient();

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    fetch(`${api}/api/client-contracts/${sessionStorage.getItem("client-contact")}`)
      .then((response) => response.json())
      .then((response) => {
        const { data, status } = response;
        if (status == 200) {
          const { array } = data;
          setItems(array);
        }
      });
  }, []);

  const handlePdf = (id) => {
    fetch(`${api}/api/client-contract/${id}`)
      .then((response) => response.json())
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          const { contract } = data;
          setContract(contract);
        }
      });
  };

  return (
    <>
      <Transition>
        <div className="my-contracts page">
          <div className="page-title">Mes devis</div>
          <div style={{ marginTop: "50px" }}></div>
          <div className="table">
            <div className="head">
              <div className="column icons"></div>
              <div className="column date">Date</div>
              <div className="column timestamp">Debut des travaux</div>
              <div className="column timestamp">Fin des travaux</div>
              <div className="column price">Prix total</div>
              <div className="column house">Maison</div>
              <div className="column finishing">Finition</div>
              <div className="column augmentation">Augmentation</div>
            </div>
            {items.map((item) => (
              <div key={item.id} className="row">
                <div className="column icons">
                  <FaEye onClick={() => navigate(`../contract/${item.id}`)} />
                  <AiOutlineDownload onClick={() => handlePdf(item.id)} />
                </div>
                <div className="column date">{formatDate(item.date)}</div>
                <div className="column timestamp">{formatTimestamp(item.begin)}</div>
                <div className="column timestamp">{formatTimestamp(item.end)}</div>
                <div className="column price">{formatPrice(item.price)} Ar</div>
                <div className="column house">{item.house.name}</div>
                <div className="column finishing">{item.finishingType.name}</div>
                <div className="column augmentation">{item.finishingAugmentation}%</div>
              </div>
            ))}
          </div>
          <Button
            text="Faire un nouveau devis"
            icon={<AiOutlinePlus />}
            onClick={() => navigate("../contract")}
          />
        </div>
        <AnimatePresence mode="wait">
          {contract && <PdfPreview contract={contract} setContract={setContract} />}
        </AnimatePresence>
      </Transition>
    </>
  );
}

export default ClientHome;
