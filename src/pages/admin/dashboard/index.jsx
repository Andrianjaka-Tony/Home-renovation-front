import { useEffect, useState } from "react";
import "./style.scss";
import { api } from "../../../helpers/api-helper";
import { useNavigate } from "react-router-dom";
import { formatDate, formatTimestamp } from "../../../helpers/date-format-helper";
import Transition from "../../../components/transition";
import { formatPrice } from "../../../helpers/price-format-helper";
import Histogram from "./histogram";

function Dashboard() {
  const [labels, setLabels] = useState([]);
  const [datas, setDatas] = useState([]);
  const [price, setPrice] = useState(0);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    fetch(`${api}/api/admin/dashboard`)
      .then((response) => response.json())
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          const { histogram, price, payment } = data;
          setDatas(histogram.map(({ price }) => price));
          setLabels(histogram.map(({ date }) => date));
          setPrice(price);
          setPayment(payment);
        }
      });
  }, []);

  return (
    <>
      <Transition>
        <div className="admin-dashboard page">
          <div className="page-title">Dashboard</div>
          <div className="dashboard-header">
            <div className="admin-dashboard-price">
              {formatPrice(price)}Ar
              <span>Prix total des devis</span>
            </div>
            <div className="admin-dashboard-price">
              {formatPrice(payment)}Ar
              <span>Paiement total des clients</span>
            </div>
          </div>
          <div className="admin-dashboard-graphic">
            <Histogram labels={labels} values={datas} />
          </div>
        </div>
      </Transition>
    </>
  );
}

export default Dashboard;
