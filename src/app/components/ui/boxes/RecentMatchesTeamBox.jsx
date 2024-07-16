import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CardHeader from "../text/CardHeader";
import SmallText from "../text/SmallText";
import FetchTeamMatchesOverview from "../api/FetchTeamMatchesOverview";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import NormalTextBlue from "../text/NormalTextBlue";
import SkeletonRecentMatchesOverviewLoading from "../skeletons/SkeletonRecentMatchesOverviewLoading";
import FinePrint from "../text/FinePrint";
import prettyDate from "../api/prettyDate";
import prettyTime from "../api/prettyTime";

const RecentMatchesTeamBox = ({ id }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const data = await FetchTeamMatchesOverview(id);
        if (data) {
          setResults(data);
        } else {
          console.error("No matches data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching recent matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [id]);

  console.log(results);

  return (
    <>
      {isLoading ? (
        <SkeletonRecentMatchesOverviewLoading NoData="" />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Recent Matches" />
          </div>
          {Array.isArray(results) && results.length > 0 ? (
            <ul className="global-small-box-matches">
              {results.map((result) =>
                result.blue.winner || result.orange.winner ? (
                  <li className="small-box-list-item-matches" key={result._id}>
                    <div className="recent-matches-blue-wrapper">
                      <NormalTextBlue
                        text={result.blue.score ? result.blue.score : "0"}
                      />
                      <div className="team-name-routing-wrapper">
                        <Link href={`/teams/${result.blue?.team?.team?._id}`} />
                        <SmallText text={result.blue?.team?.team?.name} />
                      </div>
                      {result.blue.winner ? (
                        <FinePrintTagWrapped text="WINNER" />
                      ) : null}
                    </div>
                    <div className="recent-matches-orange-wrapper">
                      <NormalTextBlue
                        text={result.orange.score ? result.orange.score : "0"}
                      />
                      <div className="team-name-routing-wrapper">
                        <Link
                          href={`/teams/${result.orange?.team?.team?._id}`}
                        />
                        <SmallText text={result.orange?.team?.team?.name} />
                      </div>
                      {result.orange.winner ? (
                        <FinePrintTagWrapped text="WINNER" />
                      ) : null}
                    </div>
                    <FinePrint
                      text={
                        result.date
                          ? prettyDate(result.date) +
                            " " +
                            prettyTime(result.date)
                          : null
                      }
                    />
                    <FinePrint text={result.event.name} />
                    <div className="rating-pill"></div>
                    <Link href={`/matches/${result._id}`} />
                  </li>
                ) : null
              )}
            </ul>
          ) : (
            <SkeletonRecentMatchesOverviewLoading NoData="No Data" />
          )}
        </div>
      )}
    </>
  );
};

export default RecentMatchesTeamBox;
