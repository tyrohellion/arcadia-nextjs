import React from "react";
import CardHeader from "../text/CardHeader";

const SkeletonPlayerDetailsLoading = () => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Player Details" />
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

export default SkeletonPlayerDetailsLoading;
