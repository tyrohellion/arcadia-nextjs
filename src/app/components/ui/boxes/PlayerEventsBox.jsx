import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import fetchPlayerEventsOverview from "../api/FetchPlayerEventsOverview";
import SmallTag from "../tags/SmallTag";
import CardHeader from "../text/CardHeader";
import SkeletonPlayerEventsBox from "../skeletons/SkeletonPlayerEventsBox";
import SkeletonPlayerEventsLoading from "../skeletons/SkeletonPlayerEventsLoading";
import getLocalDateMinusMonths from "../api/getLocalTime";
import SmallText from "../text/SmallText";
import FinePrint from "../text/FinePrint";
import FinePrintTierTag from "../tags/FinePrintTierTag";
import fetchPlayerEventStat from "../api/FetchPlayerEventStat";
import FinePrintPrettyDate from "../formatters/FinePrintPrettyDate";

const PlayerEventsBox = ({ id }) => {
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const data = getLocalDateMinusMonths(6);
        setTime(data);
      } catch (error) {
        console.error("Error fetching date:", error);
      }
    };

    fetchTime();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchPlayerEventsOverview(id, time);
        if (data) {
          data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
          setResults(data.slice(0, 4));
        } else {
          console.error("No stats data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching player stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id && time !== "") {
      fetchEvents();
    }
  }, [id, time]);

  const handleClick = (key) => {
    router.push(`/events/${key}`);
  };

  const RatingTag = ({ playerId, eventId }) => {
    const [rating, setRating] = useState("");

    useEffect(() => {
      const fetchRating = async () => {
        const result = await fetchPlayerEventStat(playerId, eventId);
        setRating(result);
      };

      fetchRating();
    }, [playerId, eventId]);

    return <SmallTag text={rating} />;
  };

  console.log(results)

  return (
    <>
      {isLoading ? (
        <SkeletonPlayerEventsLoading />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Recent Events" />
            <FinePrint text="PLAYER RATING" />
          </div>
          {Array.isArray(results) && results.length > 0 ? (
            <ul className="global-small-box">
              {results.map((result) => {
                const event = result.events[0];
                return (
                  event && (
                    <li
                      className="small-box-list-item"
                      key={event._id}
                      onClick={() => handleClick(event._id)}
                    >
                      <div className="player-event-overview-name-tier-wrapper">
                        <>
                          <SmallText text={event.name} />
                          <div className="overview-event-tier-region-wrapper">
                            <FinePrintTierTag tier={event.tier} />
                            <FinePrintPrettyDate date={result.startDate}/>
                            <FinePrint text={event.region} />
                          </div>
                        </>
                      </div>
                      <RatingTag playerId={id} eventId={event._id} />
                    </li>
                  )
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
