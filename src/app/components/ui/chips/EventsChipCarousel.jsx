import React, { useState } from "react";
import GlobalChip from "./GlobalChip";

const EventsChipCarousel = () => {
  const [activeChip, setActiveChip] = useState(0);

  const handleChipClick = (index) => {
    setActiveChip(index);
  };

  return (
    <div className="chip-carousel">
      {["Overview", "Matches", "Stats", "Players", "Teams"].map((text, index) => (
        <GlobalChip
          key={index}
          text={text}
          isActive={activeChip === index}
          onClick={() => handleChipClick(index)}
        />
      ))}
    </div>
  );
};

export default EventsChipCarousel;
