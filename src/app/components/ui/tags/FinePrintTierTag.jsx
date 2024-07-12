import React from "react";

const FinePrintTierTag = ({ tier }) => {
  if (tier == "S" || tier == "A" || tier == "B" || tier == "C" || tier == "D") {
    return <p className="global-fine-print">{tier}-Tier</p>;
  } else {
    return <p className="global-fine-print">{tier}</p>;
  }
};

export default FinePrintTierTag;