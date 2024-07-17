import React, { useState, useEffect } from "react";
import GlobalChip from "./GlobalChip";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const EventsChipCarousel = () => {
  const views = ["Overview", "Matches", "Stats", "Players", "Teams"];
  const [activeChip, setActiveChip] = useState(0);
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");

  useEffect(() => {
    if (viewParam) {
      const index = views.indexOf(viewParam);
      if (index !== -1) {
        setActiveChip(index);
      }
    }
  }, [viewParam]);

  const handleChipClick = (index) => {
    setActiveChip(index);
  };

  return (
    <div className="chip-carousel">
      {views.map((view, index) => (
        <Link href={`?view=${view}`} key={index}>
          <GlobalChip text={view} isActive={activeChip === index} />
        </Link>
      ))}
    </div>
  );
};

export default EventsChipCarousel;
