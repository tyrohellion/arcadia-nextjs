"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getMatchByID from "@/app/components/ui/api/FetchMatch";
import prettyDate from "@/app/components/ui/api/prettyDate";
import prettyTime from "@/app/components/ui/api/prettyTime";
import SmallText from "@/app/components/ui/text/SmallText";
import Link from "next/link";
import NormalText from "@/app/components/ui/text/NormalText";
import SmallTextBlue from "@/app/components/ui/text/SmallTextBlue";
import MatchDetailsBox from "@/app/components/ui/boxes/MatchDetailsBox";
import regionFormatter from "@/app/components/ui/api/regionFormatter";
import SkeletonEventDetailsLoading from "@/app/components/ui/skeletons/SkeletonEventDetailsLoading";
import SkeletonMatchSeriesCard from "@/app/components/ui/skeletons/SkeletonMatchSeriesCard";
import MatchTeamRostersBlue from "@/app/components/ui/boxes/MatchTeamRostersBlue";
import MatchTeamRostersOrange from "@/app/components/ui/boxes/MatchTeamRostersOrange";

const MatchPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [match, setMatch] = useState(true);
  const hasFetched1 = useRef(false);
  const [numOfGames, setNumOfGames] = useState(null);
  const ballchasingBaseURL = "https://ballchasing.com/replay/";

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched1.current) return;
      hasFetched1.current = true;
      try {
        const data = await getMatchByID(id);
        console.log(data);
        setMatch(data);
      } catch (error) {
        console.error("Error fetching match:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchNumOfGames = async () => {
      let seriesLength = 0;
      if (match && match.blue && match.blue.score) {
        seriesLength = match.blue.score + seriesLength;
      }
      if (match && match.orange && match.orange.score) {
        seriesLength = match.orange.score + seriesLength;
      }
      setNumOfGames(seriesLength);
    };

    fetchNumOfGames();
  }, [match]);

  return (
    <>
      {isLoading ? (
        <SkeletonMatchSeriesCard />
      ) : (
        <>
          <div className="match-series-card-wrapper">
            <ul className="match-series-card">
              <li className="match-series-card-team-header">
                <div className="blue-team-match-series-header">
                  {match &&
                  match.blue &&
                  match.blue.team &&
                  match.blue.team.team &&
                  match.blue.team.team._id ? (
                    <Link
                      href={`/teams/${match.blue.team.team._id}`}
                      className="img-with-link-to-team"
                    >
                      {match &&
                      match.blue &&
                      match.blue.team &&
                      match.blue.team.team &&
                      match.blue.team.team.image ? (
                        <Image
                          src={
                            match.blue.team.team.image
                              ? match.blue.team.team.image
                              : null
                          }
                          width={50}
                          height={50}
                          alt="blue image"
                          className="global-smallest-image"
                        />
                      ) : (
                        <Image
                          src="/static/images/rocketleague.svg"
                          width={50}
                          height={50}
                          alt="blue image"
                          className="global-smallest-image"
                        />
                      )}
                    </Link>
                  ) : (
                    <Image
                      src={
                        match &&
                        match.blue &&
                        match.blue.team &&
                        match.blue.team.team &&
                        match.blue.team.team.image
                          ? match.blue.team.team.image
                          : null
                      }
                      width={50}
                      height={50}
                      alt="blue image"
                      className="global-smallest-image"
                    />
                  )}
                  <div className="blue-team-tooltip-name">
                    {match &&
                    match.blue &&
                    match.blue.team &&
                    match.blue.team.team &&
                    match.blue.team.team._id ? (
                      <Link href={`/teams/${match.blue.team.team._id}`} />
                    ) : null}
                    {match &&
                    match.blue &&
                    match.blue.team &&
                    match.blue.team.team &&
                    match.blue.team.team.name
                      ? match.blue.team.team.name
                      : null}
                  </div>
                  <div className="arrow-for-blue-team-name"></div>
                </div>
                <div className="orange-team-match-series-header">
                  <div className="orange-team-tooltip-name">
                    {match &&
                    match.orange &&
                    match.orange.team &&
                    match.orange.team.team &&
                    match.orange.team.team._id ? (
                      <Link href={`/teams/${match.orange.team.team._id}`} />
                    ) : null}
                    {match &&
                    match.orange &&
                    match.orange.team &&
                    match.orange.team.team &&
                    match.orange.team.team.name
                      ? match.orange.team.team.name
                      : null}
                  </div>
                  {match &&
                  match.orange &&
                  match.orange.team &&
                  match.orange.team.team &&
                  match.orange.team.team._id ? (
                    <Link
                      href={`/teams/${match.orange.team.team._id}`}
                      className="img-with-link-to-team"
                    >
                      {match &&
                      match.orange &&
                      match.orange.team &&
                      match.orange.team.team &&
                      match.orange.team.team.image ? (
                        <Image
                          src={
                            match.orange.team.team.image
                              ? match.orange.team.team.image
                              : null
                          }
                          width={50}
                          height={50}
                          alt="orange image"
                          className="global-smallest-image"
                        />
                      ) : (
                        <Image
                          src="/static/images/rocketleague.svg"
                          width={50}
                          height={50}
                          alt="orange image"
                          className="global-smallest-image"
                        />
                      )}
                    </Link>
                  ) : (
                    <Image
                      src={
                        match &&
                        match.orange &&
                        match.orange.team &&
                        match.orange.team.team &&
                        match.orange.team.team.image
                          ? match.orange.team.team.image
                          : null
                      }
                      width={50}
                      height={50}
                      alt="orange image"
                      className="global-smallest-image"
                    />
                  )}
                  <div className="arrow-for-orange-team-name"></div>
                </div>
              </li>
              {numOfGames !== 0 ? (
                <>
                  {Array.from({ length: numOfGames }).map((_, index) => (
                    <li className="scores-list-item-match" key={index}>
                      <div className="scores-list-inner-wrapper">
                        {match?.games &&
                        match?.games[index] &&
                        match?.games[index]?.ballchasing ? (
                          <>
                            <NormalText
                              text={
                                match.games[index].blue
                                  ? match.games[index].blue
                                  : "0"
                              }
                            />
                            {match?.games[index].overtime &&
                            match?.games[index].duration > 300 ? (
                              <div className="game-ballchasing-link-wrapper">
                                <a
                                  href={
                                    ballchasingBaseURL +
                                    match.games[index].ballchasing
                                  }
                                  target="_blank"
                                >
                                  <div className="global-small-text-blue">
                                    Game{" "}
                                    {index +
                                      1 +
                                      " (+" +
                                      Math.floor(
                                        (match.games[index].duration - 300) / 60
                                      ) +
                                      ":" +
                                      String(
                                        (match.games[index].duration - 300) % 60
                                      ).padStart(2, "0") +
                                      ")"}
                                  </div>
                                </a>
                                <Image
                                  src="/static/images/externallink.png"
                                  width={16}
                                  height={16}
                                  alt="external link icon"
                                />
                              </div>
                            ) : (
                              <div className="game-ballchasing-link-wrapper">
                                <a
                                  href={
                                    ballchasingBaseURL +
                                    match?.games[index]?.ballchasing
                                  }
                                  target="_blank"
                                >
                                  <div className="global-small-text-blue">
                                    Game {index + 1}
                                  </div>
                                </a>
                                <Image
                                  src="/static/images/externallink.png"
                                  width={16}
                                  height={16}
                                  alt="external link icon"
                                />
                              </div>
                            )}
                            <NormalText
                              text={
                                match?.games[index]?.orange
                                  ? match?.games[index]?.orange
                                  : "0"
                              }
                            />
                          </>
                        ) : match?.games && match?.games[index] ? (
                          <>
                            <NormalText
                              text={
                                match?.games[index]?.blue
                                  ? match?.games[index]?.blue
                                  : "0"
                              }
                            />
                            {match?.games[index].overtime &&
                            match?.games[index].duration > 300 ? (
                              <div className="global-small-text-blue">
                                Game{" "}
                                {index +
                                  1 +
                                  " (+" +
                                  Math.floor(
                                    (match?.games[index].duration - 300) / 60
                                  ) +
                                  ":" +
                                  String(
                                    (match?.games[index].duration - 300) % 60
                                  ).padStart(2, "0") +
                                  ")"}
                              </div>
                            ) : (
                              <div className="global-small-text-blue">
                                Game {index + 1}
                              </div>
                            )}
                            <NormalText
                              text={
                                match?.games[index]?.orange
                                  ? match.games[index].orange
                                  : "0"
                              }
                            />
                          </>
                        ) : (
                          <>
                            <NormalText text="?" />
                            <div className="global-small-text-blue">
                              Game {index + 1}
                            </div>
                            <NormalText text="?" />
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                  {match && numOfGames !== 0}{" "}
                  {
                    <li className="match-card-final-li">
                      {match && match.blue && match.blue.score ? (
                        <div className="match-final-scores">
                          {match.blue.score}
                        </div>
                      ) : (
                        <div className="match-final-scores">0</div>
                      )}
                      <SmallTextBlue text="Final" />
                      {match && match.orange && match.orange.score ? (
                        <div className="match-final-scores">
                          {match.orange.score}
                        </div>
                      ) : (
                        <div className="match-final-scores">0</div>
                      )}
                    </li>
                  }
                </>
              ) : (
                <div className="upcoming-match-text">
                  <SmallText text="Upcoming" />
                </div>
              )}
            </ul>
          </div>
          <div className="boxes-wrapper">
            {match ? (
              <MatchDetailsBox
                id={match.event && match.event._id ? match.event._id : null}
                event={
                  match.event && match.event.name ? match.event.name : null
                }
                startDate={
                  match.date ? prettyDate(match.date) : "No Start Date Found"
                }
                startTime={
                  match.date ? prettyTime(match.date) : "No Start Time Found"
                }
                stage={
                  match.stage && match.stage.name
                    ? match.stage.name
                    : "No Stage Found"
                }
                mode={
                  match.event && match.event.mode
                    ? match.event.mode + "v" + match.event.mode
                    : "No Mode Found"
                }
                region={
                  match.event && match.event.region
                    ? regionFormatter(match.event.region)
                    : "No Region Found"
                }
                type={match.stage && match.stage.lan ? "Lan" : "Online"}
              />
            ) : (
              <SkeletonEventDetailsLoading />
            )}
            {match &&
            match.blue &&
            match.blue.team &&
            Array.isArray(match.blue.players) ? (
              <MatchTeamRostersBlue match={match} />
            ) : null}
            {match &&
            match.orange &&
            match.orange.team &&
            Array.isArray(match.orange.players) ? (
              <MatchTeamRostersOrange match={match} />
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default MatchPage;
