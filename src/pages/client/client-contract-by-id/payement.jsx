import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal";
import { api } from "../../../helpers/api-helper";
import Select from "../../../components/select";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";

function Payment({ setPayment, setUpdates, id, setToast, setMessage }) {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/api/client/payment`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        date,
        contract: {
          id,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beader ${sessionStorage.getItem("client-contact")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message, data } = response;
        setToast(true);
        if (status == 200) {
          setUpdates((previous) => (previous += 1));
          setPayment(false);
          setMessage("Paiement effectue avec succes.");
          return;
        }
        setMessage(message);
      });
  };

  return (
    <Modal closer={() => setPayment(false)}>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Paiement</h1>
        <p className="form-text">Pour effectuer un paiement, remplir la date et le montant.</p>
        <Input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          type="number"
          label="Montant"
          required
          id="amount-input"
        />
        <Input
          value={date}
          onChange={(event) => setDate(event.target.value)}
          type="date"
          label="Date"
          required
          id="date-input"
        />
        <Button text="valider" icon={<AiOutlineArrowRight />} type="submit" />
      </form>
    </Modal>
  );
}

export default Payment;
