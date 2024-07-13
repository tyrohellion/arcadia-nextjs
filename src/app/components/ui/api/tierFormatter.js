const tierFormatter = (tier) => {
  if (tier == "S" || tier == "A" || tier == "B" || tier == "C" || tier == "D") {
    return tier + "-Tier";
  } else {
    return tier;
  }
};

export default tierFormatter;
