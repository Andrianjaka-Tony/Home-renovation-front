import "./style.scss";
import Items from "./items";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";

export default function Menu({ items }) {
  const [isShow, setShow] = useState(false);

  return (
    <nav className="menu">
      <div className="menu-container">
        <div onClick={() => setShow(true)} className="hamburger">
          <FaBars />
        </div>
        <AnimatePresence mode="wait">
          {isShow && <Items items={items} setShow={setShow} />}
        </AnimatePresence>
      </div>
    </nav>
  );
}
