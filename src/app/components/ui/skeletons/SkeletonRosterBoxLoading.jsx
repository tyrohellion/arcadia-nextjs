import React from "react";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";

const SkeletonRosterBoxLoading = ({ countryText }) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Active Roster" />
          <FinePrint text="COUNTRY" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item">
            <div className="player-tag-coach-wrapper">
              <div className="empty-pill"></div>
              <FinePrintTagWrapped text="COACH" />
            </div>
            <GlobalTag text={countryText} />
          </li>
          <li className="small-box-list-item">
            <div className="player-tag-coach-wrapper">
              <div className="empty-pill"></div>
              <FinePrintTagWrapped text="SUB" />
            </div>
            <GlobalTag text={countryText} />
          </li>
          <li className="small-box-list-item">
            <div className="empty-pill"></div>
            <GlobalTag text={countryText} />
          </li>
          <li className="small-box-list-item">
            <div className="empty-pill"></div>
            <GlobalTag text={countryText} />
          </li>
          <li className="small-box-list-item">
            <div className="empty-pill"></div>
            <GlobalTag text={countryText} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonRosterBoxLoading;
