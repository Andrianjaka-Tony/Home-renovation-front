import "./style.scss";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../../components/button";
import Transition from "../../../components/transition";
import List from "./list";
import Save from "./save";
import Modification from "./modification";
import useAdmin from "../../../hooks/useAdmin";
import setPageHead from "../../../helpers/page-helper";

function FinishingType() {
  useAdmin();

  const [updates, setUpdates] = useState(0);
  const [isSave, setSave] = useState(false);
  const [modification, setModification] = useState(undefined);

  useEffect(() => {
    setPageHead({
      title: "Liste des finitions",
      description:
        "Cette page affiche la liste de toutes les finitions enregistrées dans la base de données.",
    });
  }, []);

  return (
    <Transition>
      <div className="finishing page">
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

export default FinishingType;
