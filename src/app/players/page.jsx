"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PlayerFetchWithFiltersAPI from "../components/ui/api/FetchPlayersWithCountry";
import CountryDropdown from "../components/ui/chips/CountrySelector";
import PlayerFetchAPI from "../components/ui/api/FetchPlayers";
import PlayerCardSearch from "../components/ui/boxes/PlayerCardSearch";
import countryFormatter from "../components/ui/api/countryFormatter";

const PlayersPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();
  const countryFilter = searchParams.get("country");

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (countryFilter) {
        try {
          const data = await PlayerFetchWithFiltersAPI(
            searchInput,
            countryFilter
          );

          const sortedData = data.sort((a, b) => {
            const aHasImage = a.team && a.team.image ? 1 : 0;
            const bHasImage = b.team && b.team.image ? 1 : 0;

            if (aHasImage !== bHasImage) {
              return bHasImage - aHasImage;
            }

            const aHasName = a.name ? 1 : 0;
            const bHasName = b.name ? 1 : 0;

            return bHasName - aHasName;
          });

          setResults(sortedData);
        } catch (error) {
          console.error("Error fetching players:", error);
        }
      } else {
        try {
          const data = await PlayerFetchAPI(searchInput);

          const sortedData = data.sort((a, b) => {
            const aHasImage = a.team && a.team.image ? 1 : 0;
            const bHasImage = b.team && b.team.image ? 1 : 0;

            if (aHasImage !== bHasImage) {
              return bHasImage - aHasImage;
            }

            const aHasName = a.name ? 1 : 0;
            const bHasName = b.name ? 1 : 0;

            return bHasName - aHasName;
          });

          setResults(sortedData);
        } catch (error) {
          console.error("Error fetching players:", error);
        }
      }
    };

    fetchData();
  }, [searchInput, countryFilter]);

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
        <CountryDropdown />
      </div>
      <div className="card-results-wrapper">
        {Array.isArray(results) &&
          results.map((player) => (
            <PlayerCardSearch
              id={player._id}
              tag={player.tag}
              name={player.name ? player.name : null}
              image={
                player.team && player.team.image ? player.team.image : "/static/images/rocketleague.svg"
              }
              team={player.team ? player.team.name : "No Team Found"}
              country={player.country ? countryFormatter(player.country) : "?"}
              role={
                player.coach
                  ? "Coach"
                  : player.substitute
                  ? "Sub"
                  : "Player"
              }
            />
          ))}
      </div>
    </>
  );
};

export default PlayersPage;
