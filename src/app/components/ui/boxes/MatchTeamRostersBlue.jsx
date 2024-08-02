import React from "react";
import Link from "next/link";
import GlobalTag from "../tags/GlobalTag";
import CardHeader from "../text/CardHeader";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import SkeletonRosterBoxLoading from "../skeletons/SkeletonRosterBoxLoading";

const MatchTeamRostersBlue = ({ match }) => {
  return (
    <>
      {Array.isArray(match.blue.players) && match.blue.players.length > 0 ? (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Blue" />
            <FinePrint text="COUNTRY" />
          </div>
          <ul className="global-small-box">
            <li className="small-box-list-item-title">
              {match?.blue?.team?.team?.name}
              <Link href={`/teams/${match?.blue?.team?.team?._id}`} />
            </li>
            {match?.blue?.players.map((player) => (
              <li className="small-box-list-item" key={player?.player?._id}>
                <div className="player-tag-coach-wrapper">
                  <div className="player-tag-roster">{player?.player?.tag}</div>
                  {player?.coach && <FinePrintTagWrapped text="COACH" />}
                  {player?.substitute && <FinePrintTagWrapped text="SUB" />}
                </div>
                {player?.player?.country && <GlobalTag text={player?.player?.country} />}
                <Link href={`/players/${player?.player?._id}`} />
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

export default MatchTeamRostersBlue;
