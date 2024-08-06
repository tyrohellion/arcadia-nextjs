import React from "react";
import Link from "next/link";
import Image from "next/image";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import prettyDate from "../api/prettyDate";
import tierFormatter from "../api/tierFormatter";
import regionFormatter from "../api/regionFormatter";
import EvenSmallerText from "../text/EvenSmallerText";
import NormalTextBlue from "../text/NormalTextBlue";
import prettyTime from "../api/prettyTime";
import SmallText from "../text/SmallText";

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
    <>
      <li className="match-bar">
        <Link href={`/matches/${id}`} className="match-bar-href"></Link>
        <div className="match-bar-content-wrapper">
          <div className="match-scores-teams-wrapper">
            <div className="all-row-match-bar-wrapper">
              <div className="team-scores-match-bar-wrapper">
                <NormalTextBlue text={blueTeamScore} />
                <NormalTextBlue text={orangeTeamScore} />
              </div>
              <div className="team-img-match-bar-wrapper">
                <Image src={blueImage} width={40} height={40} alt={blueTeamName} />
                <Image src={orangeImage} width={40} height={40} alt={orangeTeamName} />
              </div>
              <div className="team-names-match-bar-wrapper">
                <Link href={`/teams/${blueTeamId}`} className="match-bar-links">
                  <SmallText text={blueTeamName} />
                </Link>
                <Link
                  href={`/teams/${orangeTeamId}`}
                  className="match-bar-links"
                >
                  <SmallText text={orangeTeamName} />
                </Link>
              </div>
            </div>
          </div>
          <div className="match-full-details-wrapper">
            <div className="event-name-date-wrapper-bar">
              <Link href={`/events/${eventId}`} className="match-bar-links">
                <EvenSmallerText text={eventName} />
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
        <div className="bottom-pill-bar"></div>
      </li>
    </>
  );
};

export default MatchResultsBar;
