import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.scss";
import { characterVariants, nameVariants } from "./anime";

export default function Item({ name, to, setShow }) {
  return (
    <NavLink onClick={() => setShow(false)} to={to} className="item">
      <motion.div
        variants={nameVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="name"
      >
        {Array.from(name).map((character, index) => (
          <motion.span
            variants={characterVariants}
            key={index}
            is-space={character === " " ? "true" : "false"}
            className="character"
          >
            {character}
          </motion.span>
        ))}
      </motion.div>
    </NavLink>
  );
}
