import React from "react";
import SmallTag from "../tags/SmallTag";
import GlobalTag from "../tags/GlobalTag";

const SkeletonRosterBox = ({ text }) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <ul className="global-small-box">
          <li className="small-box-list-item">
            <div className="player-tag-coach-wrapper">
              <div className="empty-pill"></div>
              <SmallTag text="C" />
            </div>
            <GlobalTag text={text} />
          </li>
          <li className="small-box-list-item">
            <div className="player-tag-coach-wrapper">
              <div className="empty-pill"></div>
              <SmallTag text="S" />
            </div>
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

export default SkeletonRosterBox;
