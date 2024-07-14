import React from "react";
import FinePrint from "./FinePrint";

const EventMatchesUpcomingText = ({ text }) => {
  return (
    <>
      <div className="event-matches-upcoming-text-wrapper">
        <p className="global-body-text">{text}</p>
        <FinePrint text="No Data Yet" />
      </div>
    </>
  );
};

export default EventMatchesUpcomingText;
