import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import SkeletonRosterBoxLoading from "../skeletons/SkeletonRosterBoxLoading";
import GlobalSmallestImage from "../img/GlobalSmallestImage";

const EventParticipantBox = ({ id }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const eventParticipants = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const url = `https://zsr.octane.gg/events/${id}/participants`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setResults(data.participants);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    eventParticipants();
  }, [id]);

  console.log(results);

  return (
    <>
      {isLoading ? (
        <div className="event-participants-skeleton-container">
          {Array.from({ length: 20 }).map((_, index) => (
            <SkeletonRosterBoxLoading key={index} />
          ))}
        </div>
      ) : Array.isArray(results) && results.length > 0 ? (
        results.map((team, index) => (
          <div className="heading-small-box-wrapper" key={index}>
            <div className="headings-wrapper">
              <CardHeader text="Roster" />
              <FinePrint text="COUNTRY" />
            </div>
            <ul className="global-small-box">
              <Link href={`/teams/${team?.team?._id}`}>
                <li className="small-box-list-item-title-participants">
                  <img
                    className="event-participant-team-image"
                    src={
                      team?.team?.image
                        ? team.team.image
                        : "/static/images/rocketleague.svg"
                    }
                    alt={team?.team?.name ? team.team.name : "No team"}
                  />
                  {team?.team?.name}
                </li>
              </Link>
              {(team?.players).map((player) => (
                <Link href={`/players/${player?._id}`}>
                  <li className="small-box-list-item" key={player?._id}>
                    <div className="player-tag-coach-wrapper">
                      <div className="player-tag-roster">{player?.tag}</div>
                      {player?.coach && <FinePrintTagWrapped text="COACH" />}
                      {player?.substitute && <FinePrintTagWrapped text="SUB" />}
                    </div>
                    {player?.country && <GlobalTag text={player?.country} />}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))
      ) : null}
    </>
  );
};

export default EventParticipantBox;
