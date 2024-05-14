import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal";
import { api } from "../../../helpers/api-helper";
import Select from "../../../components/select";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

function Modification({ modification, setModification, setUpdates }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  const [options, setOptions] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/api/work/update`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        unit: { id: unit },
        id: modification,
        parent: { id: null },
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
    fetch(`${api}/api/work/delete/${modification}`, {
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
    fetch(`${api}/api/work/${modification}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("storage-token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message, data } = response;
        const { work } = data;
        const { name, unit, price } = work;
        setName(name);
        setUnit(unit.id);
        setPrice(price);
      });
  }, [modification]);

  useEffect(() => {
    fetch(`${api}/api/work/save`)
      .then((response) => response.json())
      .then((response) => {
        const { status, message, data } = response;
        const { units } = data;
        setOptions({
          units: units.map(({ id, name }) => ({ value: id, label: name })),
        });
      });
  }, []);

  return (
    <Modal closer={() => setModification(undefined)}>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Modifier travail</h1>
        <p className="form-text">Modifier les champs</p>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          label="Designation"
          required
          id="name-input"
        />
        <Input
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          type="number"
          label="Prix"
          required
          id="price-input"
        />
        <Select
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          label="Unite"
          options={options.units}
        />
        <Button text="valider" icon={<AiOutlineArrowRight />} type="submit" />
        <Button onClick={handleDelete} text="Supprimer" icon={<BiTrash />} type="button" />
      </form>
    </Modal>
  );
}

export default Modification;
