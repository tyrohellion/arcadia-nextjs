import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardHeader from "../text/CardHeader";
import SmallText from "../text/SmallText";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import NormalTextBlue from "../text/NormalTextBlue";
import FinePrint from "../text/FinePrint";
import prettyDate from "../api/prettyDate";
import FetchEventMatchesOverview from "../api/FetchEventMatches";
import EventMatchesUpcomingText from "../text/EventMatchesUpcomingText";
import prettyTime from "../api/prettyTime";
import SkeletonRecentMatchesEventsUpcomingOverviewLoading from "../skeletons/SkeletonRecentMatchesEventsUpcomingOverviewLoading";
import ButtonSmallest from "../buttons/ButtonSmallest";

const RecentMatchesUpcomingEventBox = ({ id }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [showSeeAllButton, setShowSeeAllButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);

      const sortOrder = completed ? "desc" : "asc";
      try {
        const data = await FetchEventMatchesOverview(id, sortOrder);
        if (data) {
          setResults(data);
          const filteredResults = data.filter((result) =>
            completed
              ? (result.blue && result.blue.score) ||
                result.blue?.winner ||
                (result.orange && result.orange.score) ||
                result.orange?.winner
              : !(
                  (result.blue && result.blue.score) ||
                  result.blue?.winner
                ) &&
                  !(
                    (result.orange && result.orange.score) ||
                    result.orange?.winner
                  )
          );
          setShowSeeAllButton(filteredResults.length > 2);
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
  }, [id, completed]);

  const toggleCompleted = (isCompleted) => {
    setCompleted(isCompleted);
  };

  const onClick = () => {
    return router.push(`?view=Matches`);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonRecentMatchesEventsUpcomingOverviewLoading NoData="" />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Recent Matches" />
          </div>
          <ul className="global-small-box-matches-events">
            {showSeeAllButton ? (
              <div className="bottom-gradient">
                <ButtonSmallest text="See All" onClick={onClick} />
              </div>
            ) : null}
            <div className="small-box-list-item-matches-buttons">
              <div className="toggle-buttons">
                <button
                  onClick={() => toggleCompleted(true)}
                  className={completed ? "active" : ""}
                >
                  Completed
                </button>
                <button
                  onClick={() => toggleCompleted(false)}
                  className={!completed ? "active" : ""}
                >
                  Upcoming
                </button>
              </div>
            </div>
            {Array.isArray(results) && results.length > 0 ? (
              results
                .filter((result) =>
                  completed
                    ? (result.blue && result.blue.score) ||
                      result.blue?.winner ||
                      (result.orange && result.orange.score) ||
                      result.orange?.winner
                    : !(
                        (result.blue && result.blue.score) ||
                        result.blue?.winner
                      ) &&
                      !(
                        (result.orange && result.orange.score) ||
                        result.orange?.winner
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
                      <div className="team-name-routing-wrapper">
                        <Link href={`/teams/${result.blue?.team?.team?._id}`} />
                        <SmallText
                          text={result.blue?.team?.team?.name || "TBD"}
                        />
                      </div>
                      {result.blue?.winner && result.blue?.score ? (
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
                      <div className="team-name-routing-wrapper">
                        <Link
                          href={`/teams/${result.orange?.team?.team?._id}`}
                        />
                        <SmallText
                          text={result.orange?.team?.team?.name || "TBD"}
                        />
                      </div>
                      {result.orange?.winner && result.orange?.score ? (
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
