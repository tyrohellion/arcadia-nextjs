import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import getActiveRoster from "../api/ActiveRoster";
import SmallTag from "../tags/SmallTag";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";
import SkeletonRosterBox from "../skeletons/SkeletonRosterBox";

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
        <SkeletonRosterBox text="" />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Active Roster" />
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
                    {player.coach ? <SmallTag text="C" /> : null}
                    {player.substitute ? <SmallTag text="S" /> : null}
                  </div>
                  {player.country ? <GlobalTag text={player.country} /> : null}
                </li>
              ))}
            </ul>
          ) : (
            <SkeletonRosterBox text="N/A" />
          )}
        </div>
      )}
    </>
  );
};

export default ActiveRosterBox;
