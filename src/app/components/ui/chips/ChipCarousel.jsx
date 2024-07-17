import React, { useState } from "react";
import GlobalChip from "./GlobalChip";

const ChipCarousel = () => {
  const [activeChip, setActiveChip] = useState(0);

  const handleChipClick = (index) => {
    setActiveChip(index);
  };

  return (
    <div className="chip-carousel">
      {["Overview", "Results", "Stats"].map((text, index) => (
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

export default ChipCarousel;
