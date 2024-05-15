import { useEffect, useState } from "react";
import "./style.scss";
import Input from "../../../components/input";
import Button from "../../../components/button";
import {
  AiOutlineArrowRight,
  AiOutlineDollar,
  AiOutlineDownload,
  AiOutlinePlus,
} from "react-icons/ai";
import { api } from "../../../helpers/api-helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Toast from "../../../components/toast";
import { formatDate, formatTimestamp } from "../../../helpers/date-format-helper";
import Transition from "../../../components/transition";
import Payment from "./payement";
import { formatPrice } from "../../../helpers/price-format-helper";
import { Resolution, usePDF } from "react-to-pdf";
import useClient from "../../../hooks/useClient";
import ContractPdfFormat from "../../contract-pdf-format";

function ClientContactById() {
  useClient();

  const { id } = useParams();

  const { toPDF, targetRef: ref } = usePDF({
    filename: "devis.pdf",
    resolution: Resolution.MEDIUM,
  });

  const [contract, setContract] = useState(undefined);

  const [updates, setUpdates] = useState(0);
  const [isPayment, setPayment] = useState(false);

  const [message, setMessage] = useState("");
  const [isToast, setToast] = useState(false);

  const totalPrice = () => {
    let response = 0;
    contract.details.forEach(({ quantity, unitPrice }) => {
      response += quantity * unitPrice;
    });
    return response;
  };

  useEffect(() => {
    fetch(`${api}/api/client-contract/${id}`)
      .then((response) => response.json())
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          const { contract } = data;
          setContract(contract);
        }
      });
  }, [id, updates]);

  return (
    <Transition>
      <div className="client-contract-by-id page">
        <h1 className="page-title">Devis</h1>
        <div className="client-contract-header">
          {contract && (
            <>
              <div className="client-contract-card">
                <div className="label">Pirx total a payer</div>
                <div className="value">{formatPrice(contract.price)} Ar</div>
              </div>
              <div className="client-contract-card">
                <div className="label">Paye</div>
                <div className="value">{formatPrice(contract.payed)} Ar</div>
              </div>
              <div className="client-contract-card">
                <div className="label">Reste a payer</div>
                <div className="value">{formatPrice(contract.price - contract.payed)} Ar</div>
              </div>
            </>
          )}
        </div>
        <Button text="Paiement" icon={<AiOutlineDollar />} onClick={() => setPayment(true)} />
      </div>
      {contract && (
        // <div ref={ref} className="client-contract-by-id-pdf">
        //   <div className="pdf-section pdf-header">
        //     <p className="designation">Designation</p>
        //     <p className="unit">Unite</p>
        //     <p className="quantity">Quantite</p>
        //     <p className="price">Prix unitaire</p>
        //     <p className="total">Total</p>
        //   </div>
        //   {contract.details.map(({ id, quantity, unitPrice, unit, work }) => (
        //     <div key={id} className="pdf-section pdf-body">
        //       <p className="designation">{work.name}</p>
        //       <p className="unit">{unit.name}</p>
        //       <p className="quantity">{quantity}</p>
        //       <p className="price">{formatPrice(unitPrice)} Ar</p>
        //       <p className="total">{formatPrice(quantity * unitPrice)}</p>
        //     </div>
        //   ))}
        //   <div className="pdf-bottom">
        //     <div className="pdf-resume">
        //       <p className="label">Augmentation de finition</p>
        //       <p className="value">{contract.finishingAugmentation}%</p>
        //     </div>
        //     <div className="pdf-resume">
        //       <p className="label">Prix</p>
        //       <p className="value">{formatPrice(totalPrice())} Ar</p>
        //     </div>
        //     <div className="pdf-resume">
        //       <p className="label">Prix total</p>
        //       <p className="value">{formatPrice(contract.price)} Ar</p>
        //     </div>
        //   </div>
        // </div>
        <ContractPdfFormat elementRef={ref} contract={contract} />
      )}
      <div className="pdf-download-link page">
        <Button onClick={toPDF} text="Telecharger en pdf" icon={<AiOutlineDownload />} />
      </div>
      <AnimatePresence mode="wait">
        {isPayment && (
          <Payment
            setToast={setToast}
            setMessage={setMessage}
            id={id}
            setPayment={setPayment}
            setUpdates={setUpdates}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isToast && <Toast text={message} setVisible={setToast} />}
      </AnimatePresence>
    </Transition>
  );
}

export default ClientContactById;
