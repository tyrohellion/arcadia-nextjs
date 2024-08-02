import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";

const SkeletonNoFormerMembersBox = () => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Former Members" />
        </div>
        <ul className="global-small-box">
          <li className="small-box-list-item-skeleton-stats">
            <FinePrint text="No Former Members or Error While Loading" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default SkeletonNoFormerMembersBox;
