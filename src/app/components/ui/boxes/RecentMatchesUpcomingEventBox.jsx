import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CardHeader from "../text/CardHeader";
import SmallText from "../text/SmallText";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import NormalTextBlue from "../text/NormalTextBlue";
import SkeletonRecentMatchesOverviewLoading from "../skeletons/SkeletonRecentMatchesOverviewLoading";
import FinePrint from "../text/FinePrint";
import prettyDate from "../api/prettyDate";
import FetchEventMatchesOverview from "../api/FetchEventMatches";
import EventMatchesUpcomingText from "../text/EventMatchesUpcomingText";

const RecentMatchesUpcomingEventBox = ({ id }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completed, setCompleted] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const data = await FetchEventMatchesOverview(id);
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

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonRecentMatchesOverviewLoading NoData="" />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Recent Matches" />
          </div>
          <ul className="global-small-box-matches-events">
            <li className="small-box-list-item-matches-buttons">
              <div className="toggle-buttons">
                <button
                  onClick={() => setCompleted(true)}
                  className={completed ? "active" : ""}
                >
                  Completed
                </button>
                <button
                  onClick={() => setCompleted(false)}
                  className={!completed ? "active" : ""}
                >
                  Upcoming
                </button>
              </div>
            </li>
            {Array.isArray(results) && results.length > 0 ? (
              results
                .filter((result) =>
                  completed
                    ? (result.blue && result.blue.score) ||
                      result.blue.winner ||
                      (result.orange && result.orange.score) ||
                      result.orange.winner
                    : !(
                        (result.blue && result.blue.score) ||
                        result.blue.winner
                      ) &&
                      !(
                        (result.orange && result.orange.score) ||
                        result.orange.winner
                      )
                )
                .map((result) => (
                  <li className="small-box-list-item-matches" key={result._id}>
                    <div className="recent-matches-blue-wrapper">
                      <NormalTextBlue
                        text={
                          result.blue && result.blue.score
                            ? result.blue.score
                            : "0"
                        }
                      />
                      <SmallText
                        text={
                          result.blue &&
                          result.blue.team &&
                          result.blue.team.team
                            ? result.blue.team.team.name
                            : "TBD"
                        }
                      />
                      {result.blue &&
                      result.blue.winner &&
                      result.blue.score ? (
                        <FinePrintTagWrapped text="WINNER" />
                      ) : null}
                    </div>
                    <div className="recent-matches-orange-wrapper">
                      <NormalTextBlue
                        text={
                          result.orange && result.orange.score
                            ? result.orange.score
                            : "0"
                        }
                      />
                      <SmallText
                        text={
                          result.orange &&
                          result.orange.team &&
                          result.orange.team.team
                            ? result.orange.team.team.name
                            : "TBD"
                        }
                      />
                      {result.orange &&
                      result.orange.winner &&
                      result.orange.score ? (
                        <FinePrintTagWrapped text="WINNER" />
                      ) : null}
                    </div>
                    <FinePrint text={prettyDate(result.date)} />
                    <div className="rating-pill"></div>
                    <Link href={`/matches/${result._id}`} />
                  </li>
                ))
            ) : (
              <EventMatchesUpcomingText text="Upcoming" />
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default RecentMatchesUpcomingEventBox;
