import React from "react";

const ButtonLarge = ({ text, onClick }) => {
  return (
    <p className="button-large" onClick={onClick}>
      {text}
    </p>
  );
};

export default ButtonLarge;
