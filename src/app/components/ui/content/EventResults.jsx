"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RegionDropdown from "../chips/regionSelector";
import TierDropdown from "../chips/tierSelector";
import ModeDropdown from "../chips/modeSelector";
import MatchResultsBar from "../boxes/MatchResultsBar";
import QualDropdown from "../chips/QualSelector";
import SkeletonResultsBarLoading from "../skeletons/SkeletonResultsBarLoading";

const EventResults = ({ id }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const searchParams = useSearchParams();

  const regionFilter = searchParams.get("region");
  const tierFilter = searchParams.get("tier");
  const modeFilter = searchParams.get("mode");
  const beforeFilter = searchParams.get("before");
  const afterFilter = searchParams.get("after");
  const qualifierFilter = searchParams.get("qualifier");
  const bestOfFilter = searchParams.get("bestOf");
  const reverseSweepFilter = searchParams.get("reverseSweep");
  const viewFilter = searchParams.get("view");

  const buildUrl = (page) => {
    const baseUrl = `https://zsr.octane.gg/matches?event=${id}&sort=date:desc&perPage=20`;
    const params = new URLSearchParams();
    if (regionFilter) params.set("region", regionFilter);
    if (tierFilter) params.set("tier", tierFilter);
    if (modeFilter) params.set("mode", modeFilter);
    if (beforeFilter) params.set("before", beforeFilter);
    if (afterFilter) params.set("after", afterFilter);
    if (qualifierFilter) params.set("qualifier", qualifierFilter);
    if (bestOfFilter) params.set("bestOf", bestOfFilter);
    if (reverseSweepFilter) params.set("reverseSweep", reverseSweepFilter);
    params.set("page", page);
    return `${baseUrl}&${params.toString()}`;
  };

  const fetchData = async (page) => {
    const url = buildUrl(page);
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Failed to fetch: ${response.statusText}`);

      const data = await response.json();
      console.log(data);

      if (data.matches && Array.isArray(data.matches)) {
        if (data.matches.length === 0) {
          setHasMore(false);
        }

        setResults((prevResults) => {
          const newResults = [...prevResults, ...data.matches];
          return Array.from(new Set(newResults.map((match) => match._id))).map(
            (id) => newResults.find((match) => match._id === id)
          );
        });
      } else {
        console.error(
          "Data format error: 'matches' is not an array or is missing."
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchData(1);
  }, [
    regionFilter,
    tierFilter,
    modeFilter,
    beforeFilter,
    afterFilter,
    qualifierFilter,
    bestOfFilter,
    reverseSweepFilter,
  ]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  const lastEventElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="input-filters-header-wrapper-results">
        <RegionDropdown />
        <TierDropdown />
        <ModeDropdown />
        <QualDropdown />
      </div>
      <div className="wrapper-bar-for-centering">
        <ul className="bar-results-wrapper">
          {results.map((match) =>
            match?._id ? (
              <MatchResultsBar
                key={match._id}
                id={match._id}
                eventName={match.event?.name ?? null}
                eventId={match.event?._id ?? null}
                blueTeamName={match.blue?.team?.team?.name ?? "TBD"}
                orangeTeamName={match.orange?.team?.team?.name ?? "TBD"}
                blueTeamId={match.blue?.team?.team?._id ?? null}
                orangeTeamId={match.orange?.team?.team?._id ?? null}
                blueTeamScore={match.blue?.score ?? "0"}
                orangeTeamScore={match.orange?.score ?? "0"}
                date={match.date ?? "Upcoming"}
                blueImage={
                  match.blue?.team?.team?.image ??
                  "/static/images/rocketleague.svg"
                }
                orangeImage={
                  match.orange?.team?.team?.image ??
                  "/static/images/rocketleague.svg"
                }
                region={match.event?.region ?? "?"}
                tier={match.event?.tier ?? "?"}
                mode={match.event?.mode ?? "?"}
                eventStage={match.stage?.name ?? "No Stage"}
                qualifier={match.stage?.qualifier ? "Qualifier" : null}
                location={match.stage?.lan ? "Lan" : "Online"}
              />
            ) : (
              <div className="skeleton-bar" key="skeleton">
                Upcoming
              </div>
            )
          )}

          {loading ? <SkeletonResultsBarLoading /> : null}
        </ul>
      </div>
      <div ref={lastEventElementRef} />
    </>
  );
};

export default EventResults;
