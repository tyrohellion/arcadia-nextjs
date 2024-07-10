import React from "react";

const ButtonSmall = ({ text, onClick }) => {
  return (
    <p className="button-small" onClick={onClick}>
      {text}
    </p>
  );
};

export default ButtonSmall;
