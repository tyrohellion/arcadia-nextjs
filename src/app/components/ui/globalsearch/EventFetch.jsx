"use client";
import { useState, useEffect } from "react";
import EventFetchAPI from "../api/FetchEvents";
import Link from "next/link";
import regionFormatter from "../api/regionFormatter";

const EventFetch = (props) => {
  const value = props.searchValue;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EventFetchAPI(value);
        setResults(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [value]);

  console.log(results);

  return (
    <>
      <div className="search-results-heading-wrapper">
        <h2>Events</h2>
        <ul className="search-results-wrapper">
          {Array.isArray(results) &&
            results.map((event) => (
              <li className="event-list-item" key={event._id}>
                {event.name}
                <div className="event-list-item-tags-wrapper">
                  {event.region ? (
                    <p className="event-region-list-item">
                      {regionFormatter(event.region)}
                    </p>
                  ) : null}
                  {event.tier ? (
                    ["S", "A", "B", "C", "D"].includes(event.tier) ? (
                      <p className="event-tier-list-item">{event.tier}-Tier</p>
                    ) : (
                      <p className="event-tier-list-item">{event.tier}</p>
                    )
                  ) : null}
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.name}
                      width="40"
                      height="40"
                    />
                  ) : null}
                </div>
                <Link href={`/events/${event._id}`} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default EventFetch;
