import React, { useState } from "react";
import Image from "next/image";
import GlobalSearch from "./GlobalSearch";

const SearchButton = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <>
      <div
        className="nav-item-search-button"
        id="searchNavButton"
        onClick={toggleOverlay}
      >
        <Image
          src="/static/images/search.svg"
          alt="search icon"
          width={18}
          height={18}
        />
      </div>
      {isOverlayVisible && <GlobalSearch onClose={toggleOverlay} />}
    </>
  );
};

export default SearchButton;
