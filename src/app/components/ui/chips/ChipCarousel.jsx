import React from "react";
import GlobalChip from "./GlobalChip";

const ChipCarousel = () => {
  return (
    <div className="chip-carousel">
      <GlobalChip text="Overview" />
      <GlobalChip text="Results" />
      <GlobalChip text="Stats" />
    </div>
  );
};

export default ChipCarousel;
