"use client";
import { useState, useEffect } from "react";
import PlayerFetchAPI from "../api/FetchPlayers";
import Link from "next/link";

const PlayerFetch = (props) => {
  const value = props.searchValue;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PlayerFetchAPI(value);

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
    };

    fetchData();
  }, [value]);

  console.log(results);

  return (
    <>
      <div className="search-results-heading-wrapper">
        <h2>Players</h2>
        <ul className="search-results-wrapper">
          {Array.isArray(results) &&
            results.map((player) => (
              <li className="player-list-item" key={player._id}>
                <div className="player-tag-name-list-wrapper">
                  {player.tag}
                  {player.name ? (
                    <div className="player-list-name">{player.name}</div>
                  ) : null}
                </div>
                <div className="player-country-image-wrapper">
                  {player.country ? (
                    <div className="player-country-list-tag">
                      {player.country}
                    </div>
                  ) : null}
                  {player.team && player.team.image ? (
                    <img
                      src={player.team.image}
                      alt="player team"
                      width="36.8"
                      height="36.8"
                      className="player-team-list-image"
                    />
                  ) : null}
                </div>
                <Link href={`/players/${player._id}`} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default PlayerFetch;
