"use client";
import { useState, useEffect } from "react";
import TeamFetchAPI from "../api/FetchTeams";
import Link from "next/link";

const TeamFetch = (props) => {
  const value = props.searchValue;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TeamFetchAPI(value);
        setResults(data);
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
        <h2>Teams</h2>
        <ul className="search-results-wrapper">
          {Array.isArray(results) &&
            results.map((team) => (
              <li
                className="team-list-item"
                key={team._id}
              >
                {team.name}
                <div className="team-region-image-wrapper">
                  {team.region ? (
                    <div className="team-region-list-tag">
                      {team.region}
                    </div>
                  ) : null}
                  {team.image ? (
                    <img src={team.image} className="team-list-image" />
                  ) : null}
                </div>
                <Link href={`/teams/${team._id}`} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default TeamFetch;
