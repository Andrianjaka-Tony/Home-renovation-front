import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { api } from "../../helpers/api-helper";
import Select from "../../components/select";
import Input from "../../components/input";
import Button from "../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

function Modification({ modification, setModification, setUpdates }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [contract, setContract] = useState("");

  const [options, setOptions] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/api/client-payment/update`, {
      method: "PUT",
      body: JSON.stringify({
        amount,
        date,
        contract: { id: contract },
        id: modification
      }),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("storage-token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message, data } = response;
        if (status == 200) {
          setUpdates((previous) => (previous += 1));
          setModification(undefined);
        }
      });
  };

  const handleDelete = () => {
    fetch(`${api}/api/client-payment/delete/${modification}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("storage-token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message } = response;
        if (status == 200) {
          setUpdates((previous) => (previous += 1));
          setModification(undefined);
        }
      });
  };

  useEffect(() => {
    fetch(`${api}/api/client-payment/${modification}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("storage-token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message, data } = response;
      });
  }, [modification]);

  // useEffect(() => {
  //   fetch(`${api}/api/ticket-sell/save`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       const { status, message, data } = response;
  //       const { tickets, locations, clients } = data;
  //       setOptions({
  //         tickets: tickets.map(({ id, name }) => ({ value: id, label: name })),
  //         locations: locations.map(({ id, name }) => ({ value: id, label: name })),
  //         clients: clients.map(({ id, name }) => ({ value: id, label: name })),
  //       });
  //       setTicket(tickets[0].id);
  //       setLocation(locations[0].id);
  //       setClient(clients[0].id);
  //     });
  // }, []);

  return (
    <Modal closer={() => setModification(undefined)}>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Modifier</h1>
        <p className="form-text">Modifier les champs</p>
        <Input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          type="text"
          label="amount"
          required
          id="amount-input"
        />
        <Input
          value={date}
          onChange={(event) => setDate(event.target.value)}
          type="text"
          label="date"
          required
          id="date-input"
        />
        <Input
          value={contract}
          onChange={(event) => setContract(event.target.value)}
          type="text"
          label="contract"
          required
          id="contract-input"
        />
        <Button text="valider" icon={<AiOutlineArrowRight />} type="submit" />
        <Button onClick={handleDelete} text="Supprimer" icon={<BiTrash />} type="button" />
      </form>
    </Modal>
  );
}

export default Modification;