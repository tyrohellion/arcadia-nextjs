"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getPlayerByID from "../../components/ui/api/Fetchplayer";
import NormalText from "../../components/ui/text/NormalText";
import SkeletonHeader from "../../components/ui/skeletons/SkeletonHeader";
import getLocalDateMinusMonths from "../../components/ui/api/getLocalTime";
import PlayerStatsBox from "../../components/ui/boxes/PlayerStatsBox";
import ChipCarousel from "../../components/ui/chips/ChipCarousel";
import SkeletonPlayerStatsLoading from "../../components/ui/skeletons/SkeletonPlayerStatsLoading";
import PlayerEventsBox from "../../components/ui/boxes/PlayerEventsBox";
import SkeletonPlayerEventsLoading from "../../components/ui/skeletons/SkeletonPlayerEventsLoading";
import ActiveRosterBox from "../../components/ui/boxes/ActiveRosterBox";
import PlayerDetailsBox from "../../components/ui/boxes/PlayerDetailsBox";
import countryFormatter from "../../components/ui/api/countryFormatter";
import SmallHeading from "../../components/ui/text/SmallHeading";
import SkeletonRecentMatchesOverviewLoading from "../../components/ui/skeletons/SkeletonRecentMatchesOverviewLoading";
import SkeletonPlayerDetailsLoading from "../../components/ui/skeletons/SkeletonPlayerDetailsLoading";
import PlayerResults from "../../components/ui/content/PlayerResults";
import SkeletonNoRosterBox from "../../components/ui/skeletons/SkeletonNoRosterBox";
import RecentMatchesPlayerBox from "../../components/ui/boxes/RecentMatchesPlayerBox";
import FinePrint from "../../components/ui/text/FinePrint";

const PlayerPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [player, setPlayer] = useState(null);
  const [months, setMonths] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched1 = useRef(false);
  const hasFetched2 = useRef(false);
  const searchParams = useSearchParams();
  const pageView = searchParams.get("view");

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
        const data = await getPlayerByID(id);
        console.log(data);
        setPlayer(data);
      } catch (error) {
        console.error("Error fetching player:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchDate = async () => {
      if (hasFetched2.current) return;
      hasFetched2.current = true;
      try {
        const date = getLocalDateMinusMonths(6);
        setMonths(date);
      } catch (error) {
        console.error("Error fetching date:", error);
      }
    };
    fetchDate();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <SkeletonHeader />
          <ChipCarousel />
        </>
      ) : (
        <div className="header-chip-wrapper">
          <div className="player-header-wrapper">
            {player ? (
              <>
                <div className="player-img-name-wrapper">
                  <div className="player-image-wrapper">
                    {player.team && player.team.image ? (
                      <img
                        src={player.team.image}
                        width="70"
                        height="70"
                        alt={player.team.name}
                        className="global-small-image"
                      />
                    ) : (
                      <img
                        src="/static/images/rocketleague.svg"
                        width="70"
                        height="70"
                        alt={player?.tag}
                        className="global-small-image"
                      />
                    )}
                  </div>
                  <div className="player-names-wrapper">
                    <SmallHeading text={player?.tag} />
                  </div>
                </div>
              </>
            ) : (
              <NormalText text={"We can't find that player :'("} />
            )}
          </div>
          {player ? <ChipCarousel /> : null}
        </div>
      )}
      {pageView === "Overview" ? (
        <div className="boxes-wrapper">
          <div className="player-details-recent-matches-wrapper">
            {player ? (
              <PlayerDetailsBox
                name={player.name ? player.name : "No Name Found"}
                country={
                  player?.country
                    ? countryFormatter(player.country)
                    : "No Country Found"
                }
                team={player?.team ? player.team.name : "No Team Found"}
                steamID={player?.accounts ? player?.accounts[0]?.id : null}
              />
            ) : (
              <SkeletonPlayerDetailsLoading />
            )}
            {player && player.team ? (
              <ActiveRosterBox
                id={player.team.slug ? player.team.slug : null}
                teamName={player.team.name ? player.team.name : null}
              />
            ) : (
              <SkeletonNoRosterBox />
            )}
          </div>
          <div className="player-stats-recent-matches-wrapper">
            {player ? (
              <PlayerStatsBox id={player.slug} />
            ) : (
              <SkeletonPlayerStatsLoading />
            )}
            {player ? (
              <PlayerEventsBox id={player.slug} />
            ) : (
              <SkeletonPlayerEventsLoading />
            )}
          </div>
          <div className="player-events-links-wrapper">
            {player ? (
              <RecentMatchesPlayerBox id={player.slug} />
            ) : (
              <SkeletonRecentMatchesOverviewLoading />
            )}
          </div>
        </div>
      ) : null}
      {pageView === "Results" && player ? (
        <PlayerResults id={player.slug ? player.slug : player._id} />
      ) : null}
      {pageView === "Stats" && player ? (
        <div className="player-stats-wrapper">
          <FinePrint text="Under Construction" />
        </div>
      ) : null}
    </>
  );
};

export default PlayerPage;
