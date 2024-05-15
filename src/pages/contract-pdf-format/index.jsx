import { useEffect, useState } from "react";
import "./style.scss";
import Input from "../../components/input";
import Button from "../../components/button";
import { api } from "../../helpers/api-helper";
import { useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { formatPrice } from "../../helpers/price-format-helper";
import useAdmin from "../../hooks/useAdmin";
import { formatDate } from "../../helpers/date-format-helper";

function ContractPdfFormat({ contract, elementRef }) {
  const totalPrice = () => {
    let response = 0;
    contract.details.forEach(({ quantity, unitPrice }) => {
      response += quantity * unitPrice;
    });
    return response;
  };

  const { payments } = contract;

  const totalPayed = () => {
    let response = 0;
    payments.forEach(({ amount }) => {
      response += amount;
    });
    return response;
  };

  return (
    <div ref={elementRef} className="contract-pdf-format">
      <h1 className="pdf-subtitle">Liste des travaux</h1>
      <div className="pdf-section pdf-header">
        <p className="designation">Designation</p>
        <p className="unit">Unite</p>
        <p className="quantity">Quantite</p>
        <p className="price">Prix unitaire</p>
        <p className="total">Total</p>
      </div>
      {contract.details.map(({ id, quantity, unitPrice, unit, work }) => (
        <div key={id} className="pdf-section pdf-body">
          <p className="designation">{work.name}</p>
          <p className="unit">{unit.name}</p>
          <p className="quantity">{quantity}</p>
          <p className="price">{formatPrice(unitPrice)} Ar</p>
          <p className="total">{formatPrice(quantity * unitPrice)} Ar</p>
        </div>
      ))}
      <div style={{ marginTop: "80px" }}></div>
      <h1 className="pdf-subtitle">Liste des paiements</h1>
      <div className="table">
        <div className="head">
          <div className="column">Date</div>
          <div className="column">Montant</div>
        </div>
        {payments.map(({ id, amount, date }) => (
          <div key={id} className="row">
            <div className="column">{formatDate(date)}</div>
            <div className="column">{formatPrice(amount)} Ar</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "100px" }}></div>
      <div className="pdf-payments"></div>
      <div className="pdf-bottom">
        <div className="pdf-resume">
          <p className="label">Total des paiements effectues</p>
          <p className="value">{formatPrice(totalPayed())} Ar</p>
        </div>
        <div className="pdf-resume">
          <p className="label">Augmentation de finition</p>
          <p className="value">{contract.finishingAugmentation}%</p>
        </div>
        <div className="pdf-resume">
          <p className="label">Prix</p>
          <p className="value">{formatPrice(totalPrice())} Ar</p>
        </div>
        <div className="pdf-resume">
          <p className="label">Prix total</p>
          <p className="value">{formatPrice(contract.price)} Ar</p>
        </div>
      </div>
    </div>
  );
}

export default ContractPdfFormat;
