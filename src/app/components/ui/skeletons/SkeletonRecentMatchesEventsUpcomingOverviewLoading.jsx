import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonRecentMatchesEventsUpcomingOverviewLoading = ({ NoData }) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Recent Matches" />
          <FinePrint text={NoData} />
        </div>
        <ul className="global-small-box-matches-events">
          <div className="small-box-list-item-matches-buttons">
            <div className="toggle-buttons">
              <button className="active">Completed</button>
              <button className="active">Upcoming</button>
            </div>
          </div>
          <li className="small-box-list-item-skeleton-stats-matches">
            <div className="small-box-list-item-skeleton-stats-wrapper-matches">
              <div className="empty-pill"></div>
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats-matches">
            <div className="small-box-list-item-skeleton-stats-wrapper-matches">
              <div className="empty-pill"></div>
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats-matches">
            <div className="small-box-list-item-skeleton-stats-wrapper-matches">
              <div className="empty-pill"></div>
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats-matches">
            <div className="small-box-list-item-skeleton-stats-wrapper-matches">
              <div className="empty-pill"></div>
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
          <li className="small-box-list-item-skeleton-stats-matches">
            <div className="small-box-list-item-skeleton-stats-wrapper-matches">
              <div className="empty-pill"></div>
              <div className="empty-pill"></div>
              <div className="empty-rating-pill"></div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonRecentMatchesEventsUpcomingOverviewLoading;
