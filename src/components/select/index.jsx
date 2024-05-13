import "./style.scss";

function Select({ value = null, onChange = () => {}, options = [], label = "" }) {
  return (
    <div className="select">
      <label htmlFor={`select-${label}`}>{label}</label>
      <select id={`select-${label}`} value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
