import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonPlayerStatsLoading = () => {
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
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonPlayerStatsLoading;
