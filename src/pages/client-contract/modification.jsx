import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { api } from "../../helpers/api-helper";
import Select from "../../components/select";
import Input from "../../components/input";
import Button from "../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

function Modification({ modification, setModification, setUpdates }) {
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState("");
  const [client, setClient] = useState("");
  const [house, setHouse] = useState("");
  const [finishingType, setFinishingType] = useState("");

  const [options, setOptions] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/api/client-contract/update`, {
      method: "PUT",
      body: JSON.stringify({
        begin,
        end,
        client: { id: client },
        house: { id: house },
        finishingType: { id: finishingType },
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
    fetch(`${api}/api/client-contract/delete/${modification}`, {
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
    fetch(`${api}/api/client-contract/${modification}`, {
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
          value={begin}
          onChange={(event) => setBegin(event.target.value)}
          type="text"
          label="begin"
          required
          id="begin-input"
        />
        <Input
          value={end}
          onChange={(event) => setEnd(event.target.value)}
          type="text"
          label="end"
          required
          id="end-input"
        />
        <Input
          value={client}
          onChange={(event) => setClient(event.target.value)}
          type="text"
          label="client"
          required
          id="client-input"
        />
        <Input
          value={house}
          onChange={(event) => setHouse(event.target.value)}
          type="text"
          label="house"
          required
          id="house-input"
        />
        <Input
          value={finishingType}
          onChange={(event) => setFinishingType(event.target.value)}
          type="text"
          label="finishingType"
          required
          id="finishingType-input"
        />
        <Button text="valider" icon={<AiOutlineArrowRight />} type="submit" />
        <Button onClick={handleDelete} text="Supprimer" icon={<BiTrash />} type="button" />
      </form>
    </Modal>
  );
}

export default Modification;