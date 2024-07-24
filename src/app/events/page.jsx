"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import EventCardSearch from "../components/ui/boxes/EventCardSearch";
import regionFormatter from "../components/ui/api/regionFormatter";
import RegionDropdown from "../components/ui/chips/regionSelector";
import TierDropdown from "../components/ui/chips/tierSelector";
import tierFormatter from "../components/ui/api/tierFormatter";
import ModeDropdown from "../components/ui/chips/modeSelector";

const EventsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const searchInputRef = useRef(null);
  const searchParams = useSearchParams();

  const regionFilter = searchParams.get("region");
  const tierFilter = searchParams.get("tier");
  const modeFilter = searchParams.get("mode");
  const beforeFilter = searchParams.get("before");
  const afterFilter = searchParams.get("after");

  const buildUrl = () => {
    const baseUrl = "https://zsr.octane.gg/events";
    const params = new URLSearchParams();
    if (searchInput) params.set("name", searchInput);
    if (regionFilter) params.set("region", regionFilter);
    if (tierFilter) params.set("tier", tierFilter);
    if (modeFilter) params.set("mode", modeFilter);
    if (beforeFilter) params.set("before", beforeFilter);
    if (afterFilter) params.set("after", afterFilter);
    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = buildUrl();
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setResults(data.events);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [searchInput, regionFilter, tierFilter, modeFilter, beforeFilter, afterFilter]);

  console.log(results);

  return (
    <>
      <div className="input-filters-header-wrapper">
        <input
          ref={searchInputRef}
          className="small-search-bar"
          placeholder="Search"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <RegionDropdown />
        <TierDropdown />
        <ModeDropdown />
      </div>
      <div className="card-results-wrapper">
        {Array.isArray(results) &&
          results.map((event) =>
            event.name ? (
              <EventCardSearch
                key={event._id}
                id={event._id}
                name={event.name ? event.name : "No Name Yet"}
                date={event.startDate ? event.startDate : "No Start Date Yet"}
                image={
                  event.image ? event.image : "/static/images/rocketleague.svg"
                }
                prize={
                  event.prize && event.prize.amount
                    ? event.prize.amount
                    : "No Prize"
                }
                prizeUnit={
                  event.prize && event.prize.currency
                    ? event.prize.currency
                    : null
                }
                region={event.region ? regionFormatter(event.region) : "?"}
                tier={event.tier ? tierFormatter(event.tier) : "?"}
                mode={event.mode ? event.mode : "?"}
              />
            ) : (
              <div className="skeleton-event" key={event._id}></div>
            )
          )}
      </div>
    </>
  );
};

export default EventsPage;
