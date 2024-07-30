import React from "react";

const ButtonSmallest = ({ text, onClick }) => {
  return (
    <p className="button-smallest" onClick={onClick}>
      {text}
    </p>
  );
};

export default ButtonSmallest;
