import React from "react";

const FilterTag = ({ text, onClick }) => {
  return (
    <div className="filter-tag-button" onClick={onClick}>
      <p className="global-fine-print">{text}</p>
      <img
        src="/static/images/closebutton.png"
        width="16"
        height="16"
        alt="close-icon"
      />
    </div>
  );
};

export default FilterTag;
