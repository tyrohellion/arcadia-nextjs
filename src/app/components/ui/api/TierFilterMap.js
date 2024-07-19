const tierCodes = {
    S: "S-Tier",
    A: "A-Tier",
    B: "B-Tier",
    C: "C-Tier",
    D: "D-Tier",
    Monthly: "Monthly",
    "Show Match": "Show Match",
    Qualifier: "Qualifier",
  };
  
  function tierFilterFormatter(code) {
    return tierCodes[code] || null;
  }
  
  export default tierFilterFormatter;
  export { tierFilterFormatter, tierCodes };
