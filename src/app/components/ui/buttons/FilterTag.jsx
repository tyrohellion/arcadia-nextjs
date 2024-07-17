import React from "react";

const FilterTag = ({ text, onClick }) => {
  return (
    <div className="filter-tag-button" onClick={onClick}>
      <p className="global-fine-print">{text}</p>
      <img src="/static/images/closebutton.png" />
    </div>
  );
};

export default FilterTag;
