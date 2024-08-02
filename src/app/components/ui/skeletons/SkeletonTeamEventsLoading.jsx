import React from "react";
import CardHeader from "../text/CardHeader";

const SkeletonTeamEventsLoading = () => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Recent Events" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
          </li>
          <li className="small-box-list-item-skeleton-stats">
            <div className="empty-pill"></div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonTeamEventsLoading;
