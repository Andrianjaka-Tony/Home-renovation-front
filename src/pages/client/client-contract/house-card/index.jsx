import { AiOutlineHome } from "react-icons/ai";
import { formatPrice } from "../../../../helpers/price-format-helper";
import "./style.scss";

function HouseCard({ id, name, description, duration, price, house, setHouse }) {
  return (
    <div onClick={() => setHouse(id)} is-active={`${id == house}`} className="house-card">
      <div>
        <div className="house-card-title">{name}</div>
        <div className="house-card-description">{description}</div>
      </div>
      <div className="house-card-icon">
        <AiOutlineHome />
      </div>
      <div>
        <div className="house-card-details">
          <div className="house-card-item">
            <div className="label">Duree</div>
            <p className="value">
              {duration}
              <span>jour{"(s)"}</span>
            </p>
          </div>
          <div className="house-card-item">
            <p className="label">Prix</p>
            <p className="value">
              {formatPrice(price)}
              <span>Ar</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseCard;
