import React from "react";
import NormalText from "../text/NormalText";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonPlayerStatsBox = ({ text }) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Stats Overview" />
          <FinePrint text="LAST 6 MONTHS" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
              <div className="empty-rating-pill"></div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonPlayerStatsBox;
