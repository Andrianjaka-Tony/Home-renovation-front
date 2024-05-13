import { motion } from "framer-motion";

export default function Transition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}