"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import CountryDropdown from "../components/ui/chips/CountrySelector";
import PlayerCardSearch from "../components/ui/boxes/PlayerCardSearch";
import countryFormatter from "../components/ui/api/countryFormatter";

const buildUrl = (searchInput, countryFilter, page) => {
  const baseUrl = "https://zsr.octane.gg/players";
  const params = new URLSearchParams();
  if (searchInput) params.set("tag", searchInput);
  if (countryFilter) params.set("country", countryFilter);
  params.set("page", page);
  return `${baseUrl}?${params.toString()}`;
};

const PlayersPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const searchInputRef = useRef(null);
  const searchParams = useSearchParams();
  const countryFilter = searchParams.get("country");

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const fetchData = async (page) => {
    const url = buildUrl(searchInput, countryFilter, page);
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      setResults((prevResults) => {
        const newResults = [...prevResults, ...data.players];
        return Array.from(new Set(newResults.map((player) => player._id))).map(
          (id) => newResults.find((player) => player._id === id)
        );
      });
      setHasMore(data.players.length > 0);
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
  }, [searchInput, countryFilter]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  const lastElementRef = useCallback(
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
          onChange={(e) => {
            setSearchInput(e.target.value);
            setResults([]);
            setPage(1);
            setHasMore(true);
          }}
        />
        <CountryDropdown />
      </div>
      <div className="card-results-wrapper">
        {results.map((player) => (
          <PlayerCardSearch
            key={player._id}
            id={player._id}
            tag={player.tag}
            name={player.name || null}
            image={
              player.team && player.team.image
                ? player.team.image
                : "/static/images/rocketleague.svg"
            }
            team={player.team ? player.team.name : "No Team Found"}
            country={player.country ? countryFormatter(player.country) : "?"}
            role={player.coach ? "Coach" : player.substitute ? "Sub" : "Player"}
          />
        ))}
        {loading &&
          Array.from({ length: 100 }).map((_, index) => (
            <div className="skeleton-event" key={index}></div>
          ))}
      </div>
      <div ref={lastElementRef} />
    </>
  );
};

export default PlayersPage;
