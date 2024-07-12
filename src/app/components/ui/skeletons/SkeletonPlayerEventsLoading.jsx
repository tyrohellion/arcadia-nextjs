import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonPlayerEventsLoading = () => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Recent Events" />
          <FinePrint text="PLAYER RATING" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
            <div className="empty-rating-tag"></div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
            <div className="empty-rating-tag"></div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
            <div className="empty-rating-tag"></div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
            <div className="empty-rating-tag"></div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
            <div className="empty-rating-tag"></div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonPlayerEventsLoading;
