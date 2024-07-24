import React from "react";

const SkeletonMatchSeriesCard = () => {
  return (
    <div className="match-series-card-wrapper">
      <ul className="match-series-card">
        <li className="match-series-card-team-header-skeleton">
          <div className="loading-smallest-image" />
          <div className="loading-smallest-image" />
        </li>
        <li className="scores-list-item-match-skeleton">
          <div className="empty-pill"></div>
        </li>
        <li className="scores-list-item-match-skeleton">
          <div className="empty-pill"></div>
        </li>
        <li className="scores-list-item-match-skeleton">
          <div className="empty-pill"></div>
        </li>
        <li className="scores-list-item-match-skeleton">
          <div className="empty-pill"></div>
        </li>
        <li className="scores-list-item-match-skeleton">
          <div className="empty-pill"></div>
        </li>
        <li className="match-card-final-li-skeleton">
          <div className="empty-pill"></div>
        </li>
      </ul>
    </div>
  );
};

export default SkeletonMatchSeriesCard;
