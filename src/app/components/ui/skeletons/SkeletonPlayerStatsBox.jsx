import React from "react";
import SmallText from "../text/SmallText";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonPlayerStatsBox = () => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Stats Overview" />
          <FinePrint text="LAST 6 MONTHS" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item-skeleton-stats">
            <SmallText text="No Recent Stats" />
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <SmallText text="No Recent Stats" />
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <SmallText text="No Recent Stats" />
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <SmallText text="No Recent Stats" />
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <SmallText text="No Recent Stats" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonPlayerStatsBox;
