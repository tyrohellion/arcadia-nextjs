"use client";
import { useState } from "react";
import PlayerFetch from "./PlayerFetch";
import TeamFetch from "./TeamFetch";
import EventFetch from "./EventFetch";
import { useRef } from "react";
import { useEffect } from "react";

const GlobalSearch = ({ onClose }) => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="global-search-wrapper">
        <input
          ref={searchInputRef}
          className="global-search-bar"
          placeholder="Search"
          type="text"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <div className="results-wrapper" onClick={onClose}>
          <PlayerFetch searchValue={searchInput} />
          <TeamFetch searchValue={searchInput} />
          <EventFetch searchValue={searchInput} />
        </div>
        <div className="fullscreen-search-backdrop" onClick={onClose}></div>
      </div>
    </>
  );
};

export default GlobalSearch;
