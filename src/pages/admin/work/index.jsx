import "./style.scss";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../../components/button";
import Transition from "../../../components/transition";
import List from "./list";
import Save from "./save";
import Modification from "./modification";

function Work() {
  const [updates, setUpdates] = useState(0);
  const [isSave, setSave] = useState(false);
  const [modification, setModification] = useState(undefined);

  return (
    <Transition>
      <div className="work page">
        <List updates={updates} setModification={setModification} />
        <AnimatePresence mode="wait">
          {isSave && <Save setUpdates={setUpdates} setSave={setSave} />}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {modification && (
            <Modification
              setUpdates={setUpdates}
              modification={modification}
              setModification={setModification}
            />
          )}
        </AnimatePresence>
        <Button onClick={() => setSave(true)} text="Ajouter" icon={<AiOutlinePlus />} />
      </div>
    </Transition>
  );
}

export default Work;
