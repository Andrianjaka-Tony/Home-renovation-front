import { useState } from "react";
import "./style.scss";
import Input from "../../components/input";
import Button from "../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { api } from "../../helpers/api-helper";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Toast from "../../components/toast";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [toast, setToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/auth/sign-in`, {
      body: JSON.stringify({ email, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, message, data } = response;
        if (status == 200) {
          const { role } = data;
          if (role.id == "ROLE01") {
            navigate("/admin/units");
          }
        } else {
          setMessage(message);
          setToast(true);
        }
      });
  };

  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h1 className="sign-in-form-title">Bonjour monde, bienvenue dans la page de connexion.</h1>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          label="Adresse e-mail"
          placeholder="John.Doe@gmail.com"
          id="sign-in-form-email-input"
          required
        />
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          label="Mot de passe"
          placeholder="mon-mot-de-passe"
          id="sign-in-form-password-input"
          required
        />
        <Button text="Connexion" icon={<AiOutlineArrowRight />} type="submit" />
        <Link to={"/sign-in-client"} className="form-link">
          Je suis un client
        </Link>
      </form>

      <AnimatePresence mode="wait">
        {toast && <Toast text={message} setVisible={setToast} />}
      </AnimatePresence>
    </div>
  );
}

export default SignIn;
