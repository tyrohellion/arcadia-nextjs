import React from "react";
import NormalText from "../text/NormalText";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonPlayerEventsBox = ({ text }) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
      <div className="headings-wrapper">
            <CardHeader text="Recent Events" />
            <FinePrint text="PLAYER RATING" />
          </div>
        <ul className="global-small-box">
          <li className="small-box-list-item-skeleton-events">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
            </div>
            <div className="empty-rating-tag"></div>
          </li>
          <li className="small-box-list-item-skeleton-events">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
            </div>
            <div className="empty-rating-tag"></div>
          </li>
          <li className="small-box-list-item-skeleton-events">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
            </div>
            <div className="empty-rating-tag"></div>
          </li>
          <li className="small-box-list-item-skeleton-events">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
            </div>
            <div className="empty-rating-tag"></div>
          </li>
          <li className="small-box-list-item-skeleton-events">
            <div className="small-box-list-item-skeleton-stats-wrapper">
              <NormalText text={text} />
            </div>
            <div className="empty-rating-tag"></div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonPlayerEventsBox;
