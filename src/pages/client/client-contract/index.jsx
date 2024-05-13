import { useEffect, useState } from "react";
import "./style.scss";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { api } from "../../../helpers/api-helper";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Toast from "../../../components/toast";
import Transition from "../../../components/transition";
import HouseCard from "./house-card";
import FinishingCard from "./finishing-card";

function ClientContract() {
  const [houses, setHouses] = useState([]);
  const [finishings, setFinishings] = useState([]);

  const [house, setHouse] = useState("");
  const [finishing, setFinishing] = useState("");
  const [begin, setBegin] = useState("");

  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/api/client-contract/save`, {
      method: "POST",
      body: JSON.stringify({
        house: { id: house },
        finishingType: { id: finishing },
        client: { contact: sessionStorage.getItem("client-contact") },
        begin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { message, status } = response;
        if (status == 200) {
          setMessage("Votre devis a ete cree avec succes");
          setToast(true);
        }
      });
  };

  useEffect(() => {
    fetch(`${api}/api/client-contract/save`)
      .then((response) => response.json())
      .then((response) => {
        const { data, status } = response;
        if (status == 200) {
          const { houses, finishings } = data;
          setHouses(houses);
          setFinishings(finishings);
          setHouse(houses[0].id);
          setFinishing(finishings[0].id);
        }
      });
  }, []);

  return (
    <Transition>
      <div className="client-contract page">
        <form onSubmit={handleSubmit}>
          <h1 className="page-title">Faire un nouveau devis</h1>
          <h2 className="client-contract-title">Maison</h2>
          <div className="client-contract-houses">
            {houses.map((item) => (
              <HouseCard {...item} house={house} setHouse={setHouse} key={item.id} />
            ))}
          </div>
          <div style={{ marginTop: "120px" }}></div>
          <h2 className="client-contract-title">Finition</h2>
          <div className="client-contract-finishings">
            {finishings.map((item) => (
              <FinishingCard
                {...item}
                finishing={finishing}
                setFinishing={setFinishing}
                key={item.id}
              />
            ))}
          </div>
          <div style={{ marginTop: "120px" }}></div>
          <h2 className="client-contract-title">Debut des travaux</h2>
          <div className="client-contract-date">
            <Input
              type="datetime-local"
              value={begin}
              onChange={(event) => setBegin(event.target.value)}
              label="Date"
              required
              id="datetime-local-begin-input"
            />
            <Button type="submit" text="valider" icon={<AiOutlineArrowRight />} />
          </div>
        </form>
      </div>
      <AnimatePresence mode="wait">
        {toast && <Toast text={message} setVisible={setToast} />}
      </AnimatePresence>
    </Transition>
  );
}

export default ClientContract;
