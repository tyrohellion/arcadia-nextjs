import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CardHeader from "../text/CardHeader";
import getFormerMembers from "../api/FetchFormerMembers";
import GlobalTag from "../tags/GlobalTag";
import SkeletonFormerMembersLoading from "../skeletons/SkeletonFormerMembersLoading";
import SkeletonNoFormerMembersBox from "../skeletons/SkeletonNoFormerMembersBox";

const TeamFormerMembersBox = ({ id }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetched = useRef(false);

  useEffect(() => {
    const FetchMembers = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const data = await getFormerMembers(id);
        if (data) {
          setResults(data);
        } else {
          console.error("No stats data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching player stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    FetchMembers();
  }, [id]);


  console.log(results)
  
  return (
    <>
      {isLoading ? (
        <SkeletonFormerMembersLoading />
      ) : Array.isArray(results) && results.length > 0 ? (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Former Members" />
          </div>
          <ul className="global-small-box-former-members">
            {results.map((player) => (
              <li className="small-box-list-item" key={player?._id}>
                <div className="player-tag-coach-wrapper">
                  <div className="player-tag-roster">{player?.tag}</div>
                </div>
                {player?.country && <GlobalTag text={player?.country} />}
                <Link href={`/players/${player?._id}`} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <SkeletonNoFormerMembersBox />
      )}
    </>
  );
};

export default TeamFormerMembersBox;
