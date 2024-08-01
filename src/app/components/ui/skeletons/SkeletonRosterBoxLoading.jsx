import React from "react";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonRosterBoxLoading = ({ countryText }) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Active Roster" />
          <FinePrint text="COUNTRY" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item-title">
            <div className="empty-pill"></div>
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
