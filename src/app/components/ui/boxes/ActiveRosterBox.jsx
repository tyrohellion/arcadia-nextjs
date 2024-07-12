import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import getActiveRoster from "../api/ActiveRoster";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import SkeletonRosterBoxLoading from "../skeletons/SkeletonRosterBoxLoading";

const ActiveRosterBox = ({ id }) => {
  const [results, setResults] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
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

  return (
    <>
      {isloading ? (
        <SkeletonRosterBoxLoading />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Active Roster" />
            <FinePrint text="COUNTRY" />
          </div>
          {Array.isArray(results) && results.length > 0 ? (
            <ul className="global-small-box">
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
          ) : (
            <SkeletonRosterBoxLoading countryText="N/A" />
          )}
        </div>
      )}
    </>
  );
};

export default ActiveRosterBox;
