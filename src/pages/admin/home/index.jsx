import { useEffect, useState } from "react";
import "./style.scss";
import { api } from "../../../helpers/api-helper";
import { useNavigate } from "react-router-dom";
import { formatDate, formatTimestamp } from "../../../helpers/date-format-helper";
import Transition from "../../../components/transition";
import { formatPrice } from "../../../helpers/price-format-helper";

function Home() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const totalPrice = () => {
    let response = 0;
    items.forEach((item) => {
      response += item.price;
    });
    return response;
  };

  const totalPayed = () => {
    let response = 0;
    items.forEach((item) => {
      response += item.payed;
    });
    return response;
  };

  useEffect(() => {
    fetch(`${api}/api/client-contracts`)
      .then((response) => response.json())
      .then((response) => {
        const { data, status } = response;
        if (status == 200) {
          const { array } = data;
          setItems(array);
        }
      });
  }, []);

  // useEffect(() => {
  //   fetch(`${api}/api/client-contracts`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       const { data, status } = response;
  //       if (status == 200) {
  //         const { array } = data;
  //         setItems(array);
  //       }
  //     });
  // }, []);

  return (
    <>
      <Transition>
        <div className="current-contracts page">
          <div className="page-title">Devis en cours</div>
          <div style={{ marginTop: "50px" }}></div>
          <div className="contract-header">
            <>
              <div className="contract-card">
                <div className="label">Prix total</div>
                <div className="value">{formatPrice(totalPrice())} Ar</div>
              </div>
              <div className="contract-card">
                <div className="label">Paye</div>
                <div className="value">{formatPrice(totalPayed())} Ar</div>
              </div>
            </>
          </div>
          <div className="table">
            <div className="head">
              <div className="column augmentation">Client</div>
              <div className="column date">Date</div>
              <div className="column timestamp">Debut des travaux</div>
              <div className="column timestamp">Fin des travaux</div>
              <div className="column price">Prix total</div>
              <div className="column price">Paiements</div>
              <div className="column price">Progression</div>
              <div className="column house">Maison</div>
              <div className="column finishing">Finition</div>
              <div className="column augmentation">Augmentation</div>
            </div>
            {items.map((item) => (
              <div onClick={() => navigate(`../contract/${item.id}`)} key={item.id} className="row">
                <div className="column date">{item.client.contact}</div>
                <div className="column date">{formatDate(item.date)}</div>
                <div className="column timestamp">{formatTimestamp(item.begin)}</div>
                <div className="column timestamp">{formatTimestamp(item.end)}</div>
                <div className="column price">{formatPrice(item.price)} Ar</div>
                <div className="column price">{formatPrice(item.payed)} Ar</div>
                <div className="column price">{formatPrice((item.payed / item.price) * 100)} %</div>
                <div className="column house">{item.house.name}</div>
                <div className="column finishing">{item.finishingType.name}</div>
                <div className="column augmentation">{item.finishingAugmentation}%</div>
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </>
  );
}

export default Home;
