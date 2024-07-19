const regionCodes = {
  INT: "International",
  NA: "North America",
  EU: "Europe",
  SAM: "South America",
  ME: "Middle East",
  ASIA: "Asia-Pacific",
  AF: "Sub-Saharan Africa",
  OCE: "Oceania"
};

function regionFilterFormatter(code) {
  return regionCodes[code.toUpperCase()];
}

export default regionFilterFormatter;
export { regionFilterFormatter, regionCodes };
