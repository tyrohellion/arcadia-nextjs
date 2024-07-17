import React, { useState } from 'react';
import GlobalSearch from './GlobalSearch';

const SearchButton = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <>
      <div className="nav-item" id="searchNavButton" onClick={toggleOverlay}>
        Search
      </div>
      {isOverlayVisible && <GlobalSearch onClose={toggleOverlay} />}
    </>
  );
};

export default SearchButton;
