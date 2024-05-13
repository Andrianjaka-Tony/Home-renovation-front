import { useState } from "react";
import "./style.scss";
import Input from "../../components/input";
import Button from "../../components/button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { api } from "../../helpers/api-helper";
import { Link } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${api}/auth/sign-up`, {
      body: JSON.stringify({ firstName, lastName, email, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (status == 200) {
        } else {
        }
      });
  };

  return (
    <div className="sign-up">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h1 className="sign-up-form-title">
          Bienvenue, pour vous inscrire, remplissez le formulaire suivant.
        </h1>
        <Input
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          type="text"
          label="Nom"
          placeholder="John"
          id="sign-up-form-first-name-input"
          required
        />
        <Input
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          type="text"
          label="Prenom"
          placeholder="Doe"
          id="sign-up-form-last-name-input"
          required
        />
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          label="Adresse e-mail"
          placeholder="John.Doe@gmail.com"
          id="sign-up-form-email-input"
          required
        />
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          label="Mot de passe"
          placeholder="mon-mot-de-passe"
          id="sign-up-form-password-input"
          required
        />
        <Button text="Inscription" icon={<AiOutlineArrowRight />} type="submit" />
        <Link to={"/sign-in"} className="form-link">
          J'ai deja un compte
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
