"use client";
import { useState } from "react";
import PlayerFetch from "./PlayerFetch";
import TeamFetch from "./TeamFetch";
import EventFetch from "./EventFetch";

const GlobalSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <div className="global-search-wrapper">
        <input
          className="global-search-bar"
          placeholder="Search"
          type="text"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <div className="results-wrapper">
          <PlayerFetch searchValue={searchInput} />
          <TeamFetch searchValue={searchInput} />
          <EventFetch searchValue={searchInput} />
        </div>
      </div>
    </>
  );
};

export default GlobalSearch;
