import React from "react";

const GlobalChip = ({ text, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`chip-button ${isActive ? "active" : ""}`}
    >
      {text}
    </div>
  );
};

export default GlobalChip;
