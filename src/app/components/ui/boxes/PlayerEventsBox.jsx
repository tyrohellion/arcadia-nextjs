import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import CardHeader from "../text/CardHeader";
import SkeletonPlayerEventsBox from "../skeletons/SkeletonPlayerEventsBox";
import SmallText from "../text/SmallText";
import FinePrint from "../text/FinePrint";
import FinePrintTierTag from "../tags/FinePrintTierTag";
import FinePrintPrettyDate from "../formatters/FinePrintPrettyDate";
import FetchPlayerEventsOverview from "../api/FetchPlayerEventsOverview";
import SkeletonTeamEventsLoading from "../skeletons/SkeletonTeamEventsLoading";

const PlayerEventsBox = ({ id }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await FetchPlayerEventsOverview(id);
        if (data) {
          setResults(data);
        } else {
          console.error("No stats data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching player stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <SkeletonTeamEventsLoading />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Recent Events" />
          </div>
          {Array.isArray(results) && results.length > 0 ? (
            <ul className="global-small-box">
              {results.map((event) => {
                return (
                  <li className="small-box-list-item" key={event?._id}>
                    <div className="player-event-overview-name-tier-wrapper">
                      <>
                        <SmallText text={event?.name} />
                        <div className="overview-event-tier-region-wrapper">
                          <FinePrintTierTag tier={event?.tier} />
                          <FinePrintPrettyDate date={event?.start_date} />
                          <FinePrint text={event?.region} />
                        </div>
                      </>
                    </div>
                    <Link href={`/events/${event?._id}`} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <SkeletonPlayerEventsBox text="N/A" />
          )}
        </div>
      )}
    </>
  );
};

export default PlayerEventsBox;
