"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getPlayerByID from "@/app/components/ui/api/Fetchplayer";
import NormalText from "@/app/components/ui/text/NormalText";
import SkeletonHeader from "@/app/components/ui/skeletons/SkeletonHeader";
import getLocalDateMinusMonths from "@/app/components/ui/api/getLocalTime";
import PlayerStatsBox from "@/app/components/ui/boxes/PlayerStatsBox";
import ChipCarousel from "@/app/components/ui/chips/ChipCarousel";
import SkeletonPlayerStatsLoading from "@/app/components/ui/skeletons/SkeletonPlayerStatsLoading";
import PlayerEventsBox from "@/app/components/ui/boxes/PlayerEventsBox";
import SkeletonPlayerEventsLoading from "@/app/components/ui/skeletons/SkeletonPlayerEventsLoading";
import ActiveRosterBox from "@/app/components/ui/boxes/ActiveRosterBox";
import PlayerDetailsBox from "@/app/components/ui/boxes/PlayerDetailsBox";
import countryFormatter from "@/app/components/ui/api/countryFormatter";
import GlobalSmallImage from "@/app/components/ui/img/GlobalSmallImage";
import SmallHeading from "@/app/components/ui/text/SmallHeading";
import SkeletonRecentMatchesOverviewLoading from "@/app/components/ui/skeletons/SkeletonRecentMatchesOverviewLoading";
import RecentMatchesPlayerBox from "@/app/components/ui/boxes/RecentMatchesPlayerBox";
import SkeletonPlayerDetailsLoading from "@/app/components/ui/skeletons/SkeletonPlayerDetailsLoading";
import PlayerResults from "@/app/components/ui/content/PlayerResults";

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
                      <GlobalSmallImage
                        imageSrc={player.team.image}
                        altText={player.team.name}
                      />
                    ) : (
                      <GlobalSmallImage
                        imageSrc="/static/images/rocketleague.svg"
                        altText={player.tag}
                      />
                    )}
                  </div>
                  <div className="player-names-wrapper">
                    <SmallHeading text={player.tag} />
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
                  player.country
                    ? countryFormatter(player.country)
                    : "No Country Found"
                }
                team={player.team ? player.team.name : "No Team Found"}
                steamID={player.accounts ? player.accounts[0].id : null}
              />
            ) : (
              <SkeletonPlayerDetailsLoading />
            )}
            {player && player.team ? (
              <ActiveRosterBox
                id={player.team._id}
                teamName={player.team.name}
              />
            ) : null}
          </div>
          <div className="player-stats-recent-matches-wrapper">
            {player ? (
              <PlayerStatsBox id={player._id} />
            ) : (
              <SkeletonPlayerStatsLoading />
            )}
            {player ? (
              <PlayerEventsBox id={player._id} />
            ) : (
              <SkeletonPlayerEventsLoading />
            )}
          </div>
          <div className="player-events-links-wrapper">
            {player ? (
              <RecentMatchesPlayerBox id={player._id} />
            ) : (
              <SkeletonRecentMatchesOverviewLoading />
            )}
          </div>
        </div>
      ) : null}
      {pageView === "Results" ? <PlayerResults id={id} /> : null}
    </>
  );
};

export default PlayerPage;
