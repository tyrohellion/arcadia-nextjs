import React from "react";
import Link from "next/link";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import prettyDate from "../api/prettyDate";
import tierFormatter from "../api/tierFormatter";
import regionFormatter from "../api/regionFormatter";
import EvenSmallerText from "../text/EvenSmallerText";
import NormalTextBlue from "../text/NormalTextBlue";
import prettyTime from "../api/prettyTime";

const MatchResultsBar = ({
  id,
  blueTeamName,
  blueTeamId,
  orangeTeamId,
  blueTeamScore,
  orangeTeamScore,
  orangeTeamName,
  blueImage,
  orangeImage,
  eventName,
  eventId,
  eventStage,
  qualifier,
  location,
  region,
  tier,
  date,
  mode,
}) => {
  return (
    <Link href={`/matches/${id}`} className="match-bar-href">
      <div className="match-bar">
        <div className="match-scores-teams-wrapper">
          <div className="team-img-match-bar-wrapper">
            <img src={blueImage} alt={blueTeamName} />
            <img src={orangeImage} alt={orangeTeamName} />
          </div>
          <div className="team-scores-match-bar-wrapper">
            <NormalTextBlue text={blueTeamScore} />
            <NormalTextBlue text={orangeTeamScore} />
          </div>
          <div className="team-names-match-bar-wrapper">
            <Link href={`/teams/${blueTeamId}`}>
              <EvenSmallerText text={blueTeamName} />
            </Link>
            <Link href={`/teams/${orangeTeamId}`}>
              <EvenSmallerText text={orangeTeamName} />
            </Link>
          </div>
        </div>
        <div className="match-full-details-wrapper">
          <div className="bar-tag-name-wrapper">
            <Link href={`/events/${eventId}`}>
              <FinePrint text={eventName} />
            </Link>
            <div className="date-time-match-bar-wrapper">
              <FinePrint text={prettyDate(date)} />
              <FinePrint text={prettyTime(date)} />
            </div>
          </div>
          <div className="bar-tags-wrapper">
            <FinePrintTagWrapped text={eventStage} />
            <FinePrintTagWrapped text={regionFormatter(region)} />
            <FinePrintTagWrapped text={tierFormatter(tier)} />
            <FinePrintTagWrapped text={mode + "v" + mode} />
            {qualifier ? <FinePrintTagWrapped text={qualifier} /> : null}
            <FinePrintTagWrapped text={location} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchResultsBar;
