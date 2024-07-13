import React from "react";

const GlobalSmallImage = ({ imageSrc, altText }) => {
  return <img src={imageSrc} alt={altText} className="global-small-image" />;
};

export default GlobalSmallImage;
