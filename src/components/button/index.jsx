import { motion } from "framer-motion";
import "./style.scss";
import { useState } from "react";
import { hoverChildrenVariants, hoverVariants } from "./anime";

export default function Button({ text = "", icon, ...rest }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <motion.button
      whileHover={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      {...rest}
      className="btn"
    >
      <div className="btn-text">{text}</div>
      <div className="container">
        <div className="dot"></div>
      </div>
      <motion.div
        variants={hoverVariants}
        initial="initial"
        animate={isHovered ? "hovered" : "initial"}
        className="hover"
      >
        <motion.div variants={hoverChildrenVariants} className="btn-text">
          {text}
        </motion.div>
        <motion.div variants={hoverChildrenVariants} className="icon">
          {icon}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
