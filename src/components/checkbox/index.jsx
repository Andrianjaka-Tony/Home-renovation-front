import "./style.scss";

function Checkbox({ state = [], setState = () => {}, options = [], radio = false }) {
  const handleChange = (value) => {
    if (radio) {
      setState([value]);
      return;
    }
    if (state.includes(value)) {
      setState(state.filter((element) => element != value));
      return;
    }
    setState([...state, value]);
  };

  return (
    <div className="checkboxes">
      {options.map(({ value, label }) => (
        <div
          onClick={() => handleChange(value)}
          key={value}
          is-checked={`${state.includes(value)}`}
          className="checkbox"
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default Checkbox;
