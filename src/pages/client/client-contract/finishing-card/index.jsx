import "./style.scss";

function FinishingCard({ id, name, augmentation, finishing, setFinishing }) {
  return (
    <div
      onClick={() => setFinishing(id)}
      is-active={`${id == finishing}`}
      className="finishing-card"
    >
      <div className="finishing-card-augmentation">{augmentation}%</div>
      <div className="finishing-card-name">{name}</div>
    </div>
  );
}

export default FinishingCard;
