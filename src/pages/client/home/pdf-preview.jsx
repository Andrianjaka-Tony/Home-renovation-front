import { Resolution, usePDF } from "react-to-pdf";
import ContractPdfFormat from "../../contract-pdf-format";
import { AiOutlineClose, AiOutlineDownload } from "react-icons/ai";
import Button from "../../../components/button";
import { motion } from "framer-motion";

function PdfPreview({ contract, setContract }) {
  const { toPDF, targetRef: ref } = usePDF({
    filename: "devis.pdf",
    resolution: Resolution.MEDIUM,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pdf-client-preview"
    >
      <div className="pdf-client-preview-content">
        <div className="close-container">
          <div onClick={() => setContract(undefined)} className="icon-container">
            <AiOutlineClose />
          </div>
        </div>
        <ContractPdfFormat elementRef={ref} contract={contract} />
        <Button
          style={{ marginLeft: "40px" }}
          onClick={toPDF}
          text="Telecharger en pdf"
          icon={<AiOutlineDownload />}
        />
      </div>
    </motion.div>
  );
}

export default PdfPreview;
