import React from "react";

const SkeletonHeader = () => {
  return (
    <div className="skeleton-header-wrapper">
      <div className="skeleton-image"></div>
      <div className="skeleton-details-wrapper">
        <div className="skeleton-details-large"></div>
      </div>
    </div>
  );
};

export default SkeletonHeader;
