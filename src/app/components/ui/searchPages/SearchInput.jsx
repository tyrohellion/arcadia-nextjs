"use client";
import { useState, useRef, useEffect } from "react";

const SearchInput = ({ previousSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <>
        <input
          ref={searchInputRef}
          className="small-search-bar"
          placeholder="Search"
          type="text"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
    </>
  );
};

export default SearchInput;
