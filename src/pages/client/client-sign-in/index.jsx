import { useState } from "react";
import "./style.scss";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { api } from "../../../helpers/api-helper";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Toast from "../../../components/toast";

function SignInClient() {
  const navigate = useNavigate();

  const [contact, setContact] = useState("");

  const [message, setMessage] = useState("");

  const [toast, setToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/api/client/sign-in`, {
      body: JSON.stringify({ contact }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message, data } = response;
        if (status == 200) {
          const { contact } = data;
          sessionStorage.setItem("client-contact", contact);
          navigate("/client/home");
        } else {
          setMessage(message);
          setToast(true);
        }
      });
  };

  return (
    <div className="sign-in-client">
      <form onSubmit={handleSubmit} className="sign-in-client-form">
        <h1 className="sign-in-client-form-title">Hello, heureux de vous retrouver</h1>
        <Input
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          type="text"
          label="Numero de telephone"
          placeholder="0000000000"
          id="sign-in-client-form-email-input"
          required
        />
        <Button text="Connexion" icon={<AiOutlineArrowRight />} type="submit" />
        {/* <Link to={"/sign-in"} className="form-link">
          Je suis administrateur
        </Link> */}
      </form>

      <AnimatePresence mode="wait">
        {toast && <Toast text={message} setVisible={setToast} />}
      </AnimatePresence>
    </div>
  );
}

export default SignInClient;
