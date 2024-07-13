const regionFormatter = (region) => {
  if (region == "INT") {
    return "International";
  }
  if (region == "NA") {
    return "North America";
  }
  if (region == "EU") {
    return "Europe";
  }
  if (region == "SAM") {
    return "South America";
  }
  if (region == "ME") {
    return "Middle East";
  }
  if (region == "ASIA") {
    return "Asia-Pacific";
  }
  if (region == "AF") {
    return "Sub-Saharan Africa";
  }
  if (region == "OCE") {
    return "Oceania";
  }
};

export default regionFormatter;
