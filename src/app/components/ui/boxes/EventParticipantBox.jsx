import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GlobalTag from "../tags/GlobalTag";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import SkeletonEventPartBoxLoading from "../skeletons/SkeletonEventPartBoxLoading";

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
          {Array.from({ length: 15 }).map((_, index) => (
            <SkeletonEventPartBoxLoading key={index} />
          ))}
        </div>
      ) : Array.isArray(results) && results.length > 0 ? (
        results.map((team, teamIndex) => (
          <ul
            className="global-small-box-event-part"
            key={team?.team?._id || teamIndex}
          >
            <li
              className="small-box-list-item-title-participants"
              key={team?.team?._id || `team-${teamIndex}`}
            >
              <Link href={`/teams/${team?.team?._id}`}></Link>
              <img
                width="25"
                height="25"
                src={
                  team?.team?.image
                    ? team.team.image
                    : "/static/images/rocketleague.svg"
                }
                alt={team?.team?.name ? team.team.name : "No team"}
              />
              {team?.team?.name}
            </li>
            {team?.players.map((player, playerIndex) => (
              <li
                className="small-box-list-item-event-part"
                key={player?._id || `player-${playerIndex}`}
              >
                <Link href={`/players/${player?._id}`}></Link>
                <div className="player-tag-coach-wrapper">
                  <div className="player-tag-roster">{player?.tag}</div>
                  {player?.coach && <FinePrintTagWrapped text="COACH" />}
                  {player?.substitute && <FinePrintTagWrapped text="SUB" />}
                </div>
                {player?.country && <GlobalTag text={player?.country} />}
              </li>
            ))}
          </ul>
        ))
      ) : null}
    </>
  );
};

export default EventParticipantBox;
