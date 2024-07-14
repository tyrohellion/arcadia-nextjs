import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import getActiveRoster from "../api/ActiveRoster";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import SkeletonRosterBoxLoading from "../skeletons/SkeletonRosterBoxLoading";

const ActiveRosterBox = ({ id, teamName }) => {
  const [results, setResults] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const router = useRouter();
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

  const handleClick = (key) => {
    router.push(`/players/${key}`);
  };

  const goToTeam = (key) => {
    router.push(`/teams/${key}`);
  };

  return (
    <>
      {isloading ? (
        <SkeletonRosterBoxLoading />
      ) : Array.isArray(results) && results.length > 0 ? (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Active Roster" />
            <FinePrint text="COUNTRY" />
          </div>
          <ul className="global-small-box">
            <li
              className="small-box-list-item-title"
              onClick={() => goToTeam(id)}
            >
              {teamName}
            </li>
            {results.map((player) => (
              <li
                className="small-box-list-item"
                key={player._id}
                onClick={() => handleClick(player._id)}
              >
                <div className="player-tag-coach-wrapper">
                  <div className="player-tag-roster">{player.tag}</div>
                  {player.coach ? <FinePrintTagWrapped text="COACH" /> : null}
                  {player.substitute ? (
                    <FinePrintTagWrapped text="SUB" />
                  ) : null}
                </div>
                {player.country ? <GlobalTag text={player.country} /> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <SkeletonRosterBoxLoading countryText="N/A" />
      )}
    </>
  );
};

export default ActiveRosterBox;
