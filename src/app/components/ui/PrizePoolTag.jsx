import React from "react";

const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

const PrizePoolTag = ({ amount, unit }) => {
  return <p className="global-tags">{"$"}{formatAmount(amount)} {" "} {unit}</p>;
};

export default PrizePoolTag;
