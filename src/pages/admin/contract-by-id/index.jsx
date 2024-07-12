import { useEffect, useState } from "react";
import "./style.scss";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { api } from "../../../helpers/api-helper";
import { useParams } from "react-router-dom";
import Transition from "../../../components/transition";
import { formatPrice } from "../../../helpers/price-format-helper";
import useAdmin from "../../../hooks/useAdmin";
import ContractPdfFormat from "../../contract-pdf-format";
import setPageHead from "../../../helpers/page-helper";
import { formatDate } from "../../../helpers/date-format-helper";

function ContractById() {
  useAdmin();

  const { id } = useParams();

  const [contract, setContract] = useState(undefined);

  const totalPrice = () => {
    let response = 0;
    contract.details.forEach(({ quantity, unitPrice }) => {
      response += quantity * unitPrice;
    });
    return response;
  };

  useEffect(() => {
    fetch(`${api}/api/client-contract/${id}`)
      .then((response) => response.json())
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          const { contract } = data;
          setPageHead({
            title: `${contract.house.name} - ${contract.date}`,
            description: `Devis pour le type de maison << ${
              contract.house.name
            } >> signé le ${formatDate(contract.date)}`,
          });
          setContract(contract);
        }
      });
  }, [id]);

  return (
    <Transition>
      <div className="client-contract-by-id page">
        <h1 className="page-title">Devis</h1>
        <div className="client-contract-header">
          {contract && (
            <>
              <div className="client-contract-card">
                <div className="label">Prix total a payer</div>
                <div className="value">{formatPrice(contract.price)} Ar</div>
              </div>
              <div className="client-contract-card">
                <div className="label">Paye</div>
                <div className="value">{formatPrice(contract.payed)} Ar</div>
              </div>
              <div className="client-contract-card">
                <div className="label">Reste a payer</div>
                <div className="value">{formatPrice(contract.price - contract.payed)} Ar</div>
              </div>
            </>
          )}
        </div>
      </div>
      {contract && (
        // <div className="client-contract-by-id-pdf">
        //   <div className="pdf-section pdf-header">
        //     <p className="designation">Designation</p>
        //     <p className="unit">Unite</p>
        //     <p className="quantity">Quantite</p>
        //     <p className="price">Prix unitaire</p>
        //     <p className="total">Total</p>
        //   </div>
        //   {contract.details.map(({ id, quantity, unitPrice, unit, work }) => (
        //     <div key={id} className="pdf-section pdf-body">
        //       <p className="designation">{work.name}</p>
        //       <p className="unit">{unit.name}</p>
        //       <p className="quantity">{quantity}</p>
        //       <p className="price">{formatPrice(unitPrice)} Ar</p>
        //       <p className="total">{formatPrice(quantity * unitPrice)}</p>
        //     </div>
        //   ))}
        //   <div className="pdf-bottom">
        //     <div className="pdf-resume">
        //       <p className="label">Augmentation de finition</p>
        //       <p className="value">{contract.finishingAugmentation}%</p>
        //     </div>
        //     <div className="pdf-resume">
        //       <p className="label">Prix</p>
        //       <p className="value">{formatPrice(totalPrice())} Ar</p>
        //     </div>
        //     <div className="pdf-resume">
        //       <p className="label">Prix total</p>
        //       <p className="value">{formatPrice(contract.price)} Ar</p>
        //     </div>
        //   </div>
        // </div>
        <ContractPdfFormat contract={contract} />
      )}
    </Transition>
  );
}

export default ContractById;
