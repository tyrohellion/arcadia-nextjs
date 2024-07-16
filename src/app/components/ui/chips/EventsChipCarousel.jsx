import React from "react";
import GlobalChip from "./GlobalChip";

const EventsChipCarousel = () => {
  return (
    <div className="chip-carousel">
      <GlobalChip text="Overview" />
      <GlobalChip text="Matches" />
      <GlobalChip text="Stats" />
      <GlobalChip text="Players" />
      <GlobalChip text="Teams" />
    </div>
  );
};

export default EventsChipCarousel;
