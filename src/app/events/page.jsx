"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const searchInputRef = useRef(null);
  const searchParams = useSearchParams();

  const regionFilter = searchParams.get("region");
  const tierFilter = searchParams.get("tier");
  const modeFilter = searchParams.get("mode");
  const beforeFilter = searchParams.get("before");
  const afterFilter = searchParams.get("after");

  const buildUrl = (page) => {
    const baseUrl = "https://zsr.octane.gg/events";
    const params = new URLSearchParams();
    if (searchInput) params.set("name", searchInput);
    if (regionFilter) params.set("region", regionFilter);
    if (tierFilter) params.set("tier", tierFilter);
    if (modeFilter) params.set("mode", modeFilter);
    if (beforeFilter) params.set("before", beforeFilter);
    if (afterFilter) params.set("after", afterFilter);
    params.set("page", page);
    return `${baseUrl}?${params.toString()}`;
  };

  const fetchData = async (page) => {
    const url = buildUrl(page);
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      if (data.events.length === 0) {
        setHasMore(false);
      }

      setResults((prevResults) => {
        const newResults = [...prevResults, ...data.events];
        return Array.from(new Set(newResults.map((event) => event._id))).map(
          (id) => newResults.find((event) => event._id === id)
        );
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchData(1);
  }, [
    searchInput,
    regionFilter,
    tierFilter,
    modeFilter,
    beforeFilter,
    afterFilter,
  ]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  const lastEventElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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
        {results.map((event) =>
          event.name ? (
            <EventCardSearch
              key={event._id}
              id={event._id}
              name={event.name || "No Name Yet"}
              date={event.startDate || "No Start Date Yet"}
              image={event.image || "/static/images/rocketleague.svg"}
              prize={event.prize?.amount || "No Prize"}
              prizeUnit={event.prize?.currency || null}
              region={regionFormatter(event.region) || "?"}
              tier={tierFormatter(event.tier) || "?"}
              mode={event.mode || "?"}
            />
          ) : (
            <div className="skeleton-event" key={event._id}>
              Upcoming
            </div>
          )
        )}
        {loading &&
          Array.from({ length: 100 }).map((_, index) => (
            <div className="skeleton-event" key={index}></div>
          ))}
      </div>
      <div ref={lastEventElementRef} />
    </>
  );
};

export default EventsPage;
