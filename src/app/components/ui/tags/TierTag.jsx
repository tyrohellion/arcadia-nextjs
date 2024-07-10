import React from "react";

const TierTag = ({ tier }) => {
  if (tier == "S" || tier == "A" || tier == "B" || tier == "C" || tier == "D") {
    return <p className="tier-tag">{tier}-Tier</p>;
  } else {
    return <p className="tier-tag">{tier}</p>;
  }
};

export default TierTag;
