"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TeamFetchAPI from "../components/ui/api/FetchTeams";
import TeamCardSearch from "../components/ui/boxes/TeamCardSearch";
import regionFormatter from "../components/ui/api/regionFormatter";

const TeamsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TeamFetchAPI(searchInput);
        setResults(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchData();
  }, [searchInput]);

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
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>
      <div className="card-results-wrapper">
        {Array.isArray(results) &&
          results.map((team) => (
            <TeamCardSearch
              id={team._id}
              name={team.name}
              image={
                team.image
                  ? team.image
                  : "/static/images/rocketleague.svg"
              }
              region={team.region ? regionFormatter(team.region) : "?"}
            />
          ))}
      </div>
    </>
  );
};

export default TeamsPage;
