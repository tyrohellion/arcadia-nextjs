import React from "react";

const formatAmount = (amount) => {
  return new Intl.NumberFormat("en-US").format(amount);
};

const FinePrintPrizeTag = ({ amount, unit }) => {
  return (
    <p className="global-fine-print">
      {"$"}
      {formatAmount(amount)} {unit}
    </p>
  );
};

export default FinePrintPrizeTag;
