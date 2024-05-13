import { useEffect, useState } from "react";
import "./style.scss";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { AiOutlineArrowRight, AiOutlineDollar, AiOutlinePlus } from "react-icons/ai";
import { api } from "../../../helpers/api-helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Toast from "../../../components/toast";
import { formatDate, formatTimestamp } from "../../../helpers/date-format-helper";
import Transition from "../../../components/transition";
import Payment from "./payement";

function ClientContractById() {
  const { id } = useParams();

  const [updates, setUpdates] = useState(0);
  const [isPayment, setPayment] = useState(false);

  return (
    <Transition>
      <div className="client-contract-by-id page">
        <h1 className="page-title">Devis</h1>
        <Button text="Paiement" icon={<AiOutlineDollar />} onClick={() => setPayment(true)} />
      </div>
      <AnimatePresence mode="wait">
        {isPayment && <Payment id={id} setPayment={setPayment} setUpdates={setUpdates} />}
      </AnimatePresence>
    </Transition>
  );
}

export default ClientContractById;
