import React from "react";
import GlobalTag from "../tags/GlobalTag";

const SkeletonEventPartBoxLoading = () => {
  return (
    <ul className="global-small-box">
      <li className="small-box-list-item-title">
        <div className="empty-pill"></div>
      </li>
      <li className="small-box-list-item">
        <div className="empty-pill"></div>
        <GlobalTag text="" />
      </li>
      <li className="small-box-list-item">
        <div className="empty-pill"></div>
        <GlobalTag text="" />
      </li>
      <li className="small-box-list-item">
        <div className="empty-pill"></div>
        <GlobalTag text="" />
      </li>
    </ul>
  );
};

export default SkeletonEventPartBoxLoading;
