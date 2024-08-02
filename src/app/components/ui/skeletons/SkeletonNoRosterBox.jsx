import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonNoRosterBox = () => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Active Roster" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item-skeleton-stats">
            <FinePrint text="No Active Roster Found" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonNoRosterBox;
