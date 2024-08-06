"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SmallText from "./components/ui/text/SmallText";
import getLocalDateMinusMonths from "./components/ui/api/getLocalTime";
import FinePrintTagWrapped from "./components/ui/tags/FinePrintTagWrapped";
import tierFormatter from "./components/ui/api/tierFormatter";
import regionFormatter from "./components/ui/api/regionFormatter";
import FinePrint from "./components/ui/text/FinePrint";
import FeaturedEventsLoading from "./components/ui/skeletons/FeaturedEventsLoading";
import FeaturedTeamsLoading from "./components/ui/skeletons/FeaturedTeamsLoading";

export default function Home() {
  const [featuredEventsS, setFeaturedEventsS] = useState([]);
  const [featuredEventsA, setFeaturedEventsA] = useState([]);
  const [featuredTeams, setFeaturedTeams] = useState([]);
  const [isLoadingS, setIsLoadingS] = useState(true);
  const [isLoadingA, setIsLoadingA] = useState(true);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [time, setTime] = useState(null);
  const hasFetchedS = useRef(false);
  const hasFetchedA = useRef(false);
  const hasFetchedTeams = useRef(false);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const data = getLocalDateMinusMonths(9);
        setTime(data);
      } catch (error) {
        console.error("Error fetching date:", error);
      }
    };

    fetchTime();
  }, []);

  useEffect(() => {
    if (!time) return;

    const featuredEventsS = async () => {
      if (hasFetchedS.current) return;
      hasFetchedS.current = true;

      const url = `https://zsr.octane.gg/events?tier=S&after=${time}`;
      console.log("Fetching URL:", url);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFeaturedEventsS(data.events);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoadingS(false);
      }
    };

    featuredEventsS();
  }, [time]);

  useEffect(() => {
    if (!time) return;

    const featuredEventsA = async () => {
      if (hasFetchedA.current) return;
      hasFetchedA.current = true;

      const url = `https://zsr.octane.gg/events?tier=A&region=NA&region=EU&region=ME&region=SAM&after=${time}`;
      console.log("Fetching URL:", url);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFeaturedEventsA(data.events.reverse());
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoadingA(false);
      }
    };

    featuredEventsA();
  }, [time]);

  useEffect(() => {
    const featuredTeams = async () => {
      if (hasFetchedTeams.current) return;
      hasFetchedTeams.current = true;

      const url = `https://zsr.octane.gg/events/65a82626370e82dfea34e7ad/participants`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFeaturedTeams(data.participants);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoadingTeams(false);
      }
    };

    featuredTeams();
  }, []);

  console.log(featuredTeams);

  return (
    <>
      <div className="arcadia-home-header-wrapper">
        <div className="branding-header-wrapper">
          <h1 className="arcadia-home-header">ARCADIA</h1>
          <Image src="/static/images/logo.svg" width={60} height={60} alt="arcadia logo" />
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

      <div className="featured-lists-wrapper">
        <ul className="featured-events-list">
          <div className="featured-heading-text">Featured Events</div>
          {isLoadingS || isLoadingA ? (
            <FeaturedEventsLoading />
          ) : (
            [...featuredEventsS, ...featuredEventsA].map((event) =>
              event && event.name && event._id ? (
                <Link href={`/events/${event._id}`} key={event._id}>
                  <li>
                    <div className="featured-small-text">{event.name}</div>
                    <div className="featured-events-tier-region-wrapper">
                      {event.tier ? (
                        <FinePrint text={tierFormatter(event.tier)} />
                      ) : null}
                      {event.region ? (
                        <FinePrint text={regionFormatter(event.region)} />
                      ) : null}
                    </div>
                  </li>
                </Link>
              ) : null
            )
          )}
        </ul>
        <ul className="featured-teams-list">
          <div className="featured-heading-text">Featured Teams</div>
          {isLoadingTeams ? (
            <FeaturedTeamsLoading />
          ) : (
            featuredTeams.map((team) =>
              team &&
              team.team &&
              team.team.name &&
              team.team._id &&
              (team.team.region === "NA" ||
                team.team.region === "EU" ||
                team.team.region === "SAM" ||
                team.team.region === "ME") ? (
                <Link href={`/teams/${team.team._id}`} key={team.team._id}>
                  <li>
                    <Image
                      src={
                        team.team.image
                          ? team.team.image
                          : "/static/images/rocketleague.svg"
                      }
                      width={45}
                      height={45}
                      alt={team.team.name}
                    />
                    <div className="featured-small-text">{team.team.name}</div>
                    <div className="featured-teams-tier-region-wrapper">
                      {team.team.region ? (
                        <FinePrintTagWrapped text={team.team.region} />
                      ) : null}
                    </div>
                  </li>
                </Link>
              ) : null
            )
          )}
        </ul>
      </div>
    </>
  );
}
