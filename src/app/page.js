"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import SmallText from "./components/ui/text/SmallText";
import featuredEvents from "./components/ui/api/FetchFeaturedEvents";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const featuredEvents = async () => {
      try {
        const data = await featuredEvents();
        console.log(data);
        setFeaturedEvents(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    featuredEvents();
  }, []);

  return (
    <>
      <div className="arcadia-home-header-wrapper">
        <div className="branding-header-wrapper">
          <h1 className="arcadia-home-header">ARCADIA</h1>
          <img src="/static/images/logo.svg" className="arcadia-logo-home" />
        </div>
        <SmallText text="Rocket League Esports" />
      </div>

      <div className="home-big-buttons-wrapper">
        <Link href={`/players`} className="big-players-button">
          PLAYERS
        </Link>
        <Link href={`/teams`} className="big-players-button">
          TEAMS
        </Link>
        <Link href={`/events`} className="big-players-button">
          EVENTS
        </Link>
      </div>
    </>
  );
}
