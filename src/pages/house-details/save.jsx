import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { api } from "../../helpers/api-helper";
import Select from "../../components/select";
import Input from "../../components/input";
import Button from "../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";

function Save({ setSave, setUpdates }) {
  const [quantity, setQuantity] = useState("");
  const [house, setHouse] = useState("");
  const [work, setWork] = useState("");

  const [options, setOptions] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/api/house-details/save`, {
      method: "POST",
      body: JSON.stringify({
        quantity,
        house: { id: house },
        work: { id: work },
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
          setSave(false);
        }
      });
  };

  // useEffect(() => {
  //   fetch(`${api}/api/house-details/save`)
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
    <Modal closer={() => setSave(false)}>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Sauvegarder</h1>
        <p className="form-text">
          Pour sauvegarder, remplir les champs ci-dessous
        </p>
        <Input
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          type="text"
          label="quantity"
          required
          id="quantity-input"
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
          value={work}
          onChange={(event) => setWork(event.target.value)}
          type="text"
          label="work"
          required
          id="work-input"
        />
        <Button text="valider" icon={<AiOutlineArrowRight />} type="submit" />
      </form>
    </Modal>
  );
}

export default Save;
