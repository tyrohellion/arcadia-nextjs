const PrizePoolFormatter = (amount, unit) => {
  let formattedPrize = new Intl.NumberFormat("en-US").format(amount);
  return "$" + formattedPrize + " " + unit;
};

export default PrizePoolFormatter