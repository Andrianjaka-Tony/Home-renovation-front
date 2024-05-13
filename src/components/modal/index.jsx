import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import "./style.scss";
import { childrenVariants, modalVariants } from "./anime";
import { createPortal } from "react-dom";

export default function Modal({ children, closer }) {
  return createPortal(
    <motion.div
      variants={modalVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal"
    >
      <motion.div variants={childrenVariants} className="close">
        <AiOutlineClose onClick={closer} className="icon" />
      </motion.div>
      <motion.div variants={childrenVariants} className="content">
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
}
