"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getMatchByID from "@/app/components/ui/api/FetchMatch";
import SmallHeading from "@/app/components/ui/text/SmallHeading";
import prettyDate from "@/app/components/ui/api/prettyDate";
import prettyTime from "@/app/components/ui/api/prettyTime";
import FinePrintTagWrappedLight from "@/app/components/ui/tags/FinePrintTagWrappedLightBackground";
import SmallText from "@/app/components/ui/text/SmallText";
import GlobalSmallestImage from "@/app/components/ui/img/GlobalSmallestImage";
import Link from "next/link";
import NormalText from "@/app/components/ui/text/NormalText";
import NormalTextBlue from "@/app/components/ui/text/NormalTextBlue";
import SmallTextBlue from "@/app/components/ui/text/SmallTextBlue";
import MatchDetailsBox from "@/app/components/ui/boxes/MatchDetailsBox";
import regionFormatter from "@/app/components/ui/api/regionFormatter";
import SkeletonEventDetailsLoading from "@/app/components/ui/skeletons/SkeletonEventDetailsLoading";

const MatchPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [match, setMatch] = useState(true);
  const hasFetched1 = useRef(false);
  const searchParams = useSearchParams();
  const pageView = searchParams.get("view");
  const [numOfGames, setNumOfGames] = useState(null);

  useEffect(() => {
    if (!pageView) {
      router.replace(`?view=Overview`);
    }
  }, [pageView, router, id]);

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
                    <GlobalSmallestImage
                      imageSrc={
                        match.blue.team.team.image
                          ? match.blue.team.team.image
                          : null
                      }
                    />
                  ) : (
                    <GlobalSmallestImage imageSrc="/static/images/rocketleague.svg" />
                  )}
                </Link>
              ) : (
                <GlobalSmallestImage
                  imageSrc={
                    match &&
                    match.blue &&
                    match.blue.team &&
                    match.blue.team.team &&
                    match.blue.team.team.image
                      ? match.blue.team.team.image
                      : null
                  }
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
                    <GlobalSmallestImage
                      imageSrc={
                        match.orange.team.team.image
                          ? match.orange.team.team.image
                          : null
                      }
                    />
                  ) : (
                    <GlobalSmallestImage imageSrc="/static/images/rocketleague.svg" />
                  )}
                </Link>
              ) : (
                <GlobalSmallestImage
                  imageSrc={
                    match &&
                    match.orange &&
                    match.orange.team &&
                    match.orange.team.team &&
                    match.orange.team.team.image
                      ? match.orange.team.team.image
                      : null
                  }
                />
              )}
              <div className="arrow-for-orange-team-name"></div>
            </div>
          </li>
          {isLoading ? (
            <SmallText text="Loading..." />
          ) : numOfGames !== 0 ? (
            <>
              {Array.from({ length: numOfGames }).map((_, index) => (
                <li className="scores-list-item-match" key={index}>
                  <div className="scores-list-inner-wrapper">
                    {match.games && match.games[index] ? (
                      <>
                        <NormalText
                          text={
                            match.games[index].blue
                              ? match.games[index].blue
                              : "0"
                          }
                        />
                        <div className="global-small-text-blue">
                          Game {index + 1}
                        </div>
                        <NormalText
                          text={
                            match.games[index].orange
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
                    <div className="match-final-scores">{match.blue.score}</div>
                  ) : (
                    <div className="match-final-scores">0</div>
                  )}
                  <SmallTextBlue text="Final" />
                  {match && match.orange && match.orange.score ? (
                     <div className="match-final-scores">{match.orange.score}</div>
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
            event={match.event && match.event.name ? match.event.name : null}
            startDate={match.date ? prettyDate(match.date) : null}
            startTime={match.date ? prettyTime(match.date) : null}
            stage={match.stage && match.stage.name ? match.stage.name : null}
            mode={
              match.event && match.event.mode
                ? match.event.mode + "v" + match.event.mode
                : null
            }
            region={
              match.event && match.event.region
                ? regionFormatter(match.event.region)
                : null
            }
            type={match.stage && match.stage.lan ? "Lan" : "Online"}
          />
        ) : (
          <SkeletonEventDetailsLoading />
        )}
      </div>
    </>
  );
};

export default MatchPage;
