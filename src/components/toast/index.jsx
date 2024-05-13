import { motion } from "framer-motion";
import "./style.scss";
import { childrenVariants, toastVariants } from "./anime";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Toast({ title = "Notification", text, children, setVisible }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="toast"
    >
      <motion.div variants={childrenVariants} className="title">
        {title}
      </motion.div>
      <motion.div variants={childrenVariants} className="text">
        {text}
      </motion.div>
      <motion.div variants={childrenVariants} className="children">
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
}
