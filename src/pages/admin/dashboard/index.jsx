import { useEffect, useState } from "react";
import "./style.scss";
import { api } from "../../../helpers/api-helper";
import { useNavigate } from "react-router-dom";
import { formatDate, formatTimestamp } from "../../../helpers/date-format-helper";
import Transition from "../../../components/transition";
import { formatPrice } from "../../../helpers/price-format-helper";
import Histogram from "./histogram";
import useAdmin from "../../../hooks/useAdmin";
import fillHistogram from "../../../helpers/fill-histogram-helper";

function Dashboard() {
  useAdmin();

  const [labels, setLabels] = useState([]);
  const [datas, setDatas] = useState([]);
  const [price, setPrice] = useState(0);
  const [payment, setPayment] = useState(0);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    fetch(`${api}/api/admin/dashboard`)
      .then((response) => response.json())
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          const { years, price, payment } = data;
          setYears(years);
          setPrice(price);
          setPayment(payment);
          setSelectedYear(years[0]);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${api}/api/admin/dashboard/${selectedYear}`)
      .then((response) => response.json())
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          let { histogram } = data;
          histogram = fillHistogram(histogram);
          setDatas(histogram.map(({ price }) => price));
          setLabels(histogram.map(({ date }) => date));
        }
      });
  }, [selectedYear]);

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
          <div className="year-nav">
            {years.map((year) => (
              <p
                className={`${selectedYear == year ? "active" : ""}`}
                key={year}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </p>
            ))}
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
