import { CiFileOn } from "react-icons/ci";
import "./style.css";

function FileInput({ onChange = () => {}, id = "", label = "", multiple = false }) {
  return (
    <div className="file-input">
      <label htmlFor={id}>
        <CiFileOn />
        <p>{label}</p>
      </label>
      <input onChange={onChange} type="file" multiple={multiple} id={id} />
    </div>
  );
}

export default FileInput;
