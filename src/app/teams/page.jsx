"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import TeamCardSearch from "../components/ui/boxes/TeamCardSearch";
import regionFormatter from "../components/ui/api/regionFormatter";

const TeamsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const searchInputRef = useRef(null);

  const searchParams = useSearchParams();

  const buildUrl = (page) => {
    const baseUrl = "https://zsr.octane.gg/teams";
    const params = new URLSearchParams();
    if (searchInput) params.set("name", searchInput);
    params.set("page", page);
    return `${baseUrl}?${params.toString()}`;
  };

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const url = buildUrl(page);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      const teamsArray = data.teams || [];

      setResults((prevResults) => {
        const existingIds = new Set(prevResults.map((team) => team._id));
        const newTeams = teamsArray.filter(
          (team) => !existingIds.has(team._id)
        );
        return [...prevResults, ...newTeams];
      });

      setHasMore(teamsArray.length > 0);
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
  }, [searchInput]);

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
      </div>
      <div className="card-results-wrapper">
        {results.map((team) => (
          <TeamCardSearch
            key={team._id}
            id={team._id}
            name={team.name}
            image={team.image ? team.image : "/static/images/rocketleague.svg"}
            region={team.region ? regionFormatter(team.region) : "?"}
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

export default TeamsPage;
