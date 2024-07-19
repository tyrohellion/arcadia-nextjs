import React from "react";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";

const SkeletonFormerMembersBox = ({ text }) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Former Members" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item">
            <div className="empty-pill"></div>
            <GlobalTag text={text} />
          </li>
          <li className="small-box-list-item">
            <div className="empty-pill"></div>
            <GlobalTag text={text} />
          </li>
          <li className="small-box-list-item">
            <div className="empty-pill"></div>
            <GlobalTag text={text} />
          </li>
          <li className="small-box-list-item">
            <div className="empty-pill"></div>
            <GlobalTag text={text} />
          </li>
          <li className="small-box-list-item">
            <div className="empty-pill"></div>
            <GlobalTag text={text} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonFormerMembersBox;
