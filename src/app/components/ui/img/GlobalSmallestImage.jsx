import React from "react";

const GlobalSmallestImage = ({ imageSrc, altText }) => {
  return <img src={imageSrc} alt={altText} className="global-smallest-image" />;
};

export default GlobalSmallestImage;
