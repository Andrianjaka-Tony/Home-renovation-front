import "./style.css";

function Input({
  value = "",
  onChange = () => {},
  type = "text",
  label = "",
  autoComplete = "off",
  placeholder = "",
  id = "input",
  required = false,
}) {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        autoComplete={autoComplete}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default Input;
