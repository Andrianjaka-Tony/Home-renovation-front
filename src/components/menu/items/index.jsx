import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import "./style.scss";
import { closeVariants, itemsVariants } from "./anime";
import Item from "./item";

export default function Items({ setShow, items }) {
  return (
    <motion.div
      variants={itemsVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="items"
    >
      <motion.div variants={closeVariants} className="close">
        <AiOutlineClose onClick={() => setShow(false)} className="icon" />
      </motion.div>
      <div className="items-container">
        {items.map((item) => (
          <Item setShow={setShow} {...item} key={item.to} />
        ))}
      </div>
    </motion.div>
  );
}
