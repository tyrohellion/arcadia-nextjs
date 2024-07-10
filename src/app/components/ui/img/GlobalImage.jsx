import React from "react";

const GlobalImage = ({ imageSrc, altText }) => {
  return <img src={imageSrc} alt={altText} className="global-image" />;
};

export default GlobalImage;
