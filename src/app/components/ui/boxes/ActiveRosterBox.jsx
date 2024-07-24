import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import getActiveRoster from "../api/ActiveRoster";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import SkeletonRosterBoxLoading from "../skeletons/SkeletonRosterBoxLoading";

const ActiveRosterBox = ({ id }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const data = await getActiveRoster(id);
        setResults(data);
      } catch (error) {
        console.error("Error fetching active roster:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log(results);

  return (
    <>
      {isLoading ? (
        <SkeletonRosterBoxLoading />
      ) : Array.isArray(results) && results.length > 0 ? (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Active Roster" />
            <FinePrint text="COUNTRY" />
          </div>
          <ul className="global-small-box">
            <li className="small-box-list-item-title">
                {results[0].team.name}
                <Link href={`/teams/${id}`} />
            </li>
            {results.map((player) => (
              <li className="small-box-list-item" key={player._id}>
                    <div className="player-tag-coach-wrapper">
                      <div className="player-tag-roster">{player.tag}</div>
                      {player.coach && <FinePrintTagWrapped text="COACH" />}
                      {player.substitute && <FinePrintTagWrapped text="SUB" />}
                    </div>
                    {player.country && <GlobalTag text={player.country} />}
                    <Link href={`/players/${player._id}`} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default ActiveRosterBox;
