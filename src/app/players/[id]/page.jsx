"use client";
import { useEffect, useState } from "react";
import getPlayerByID from "@/app/components/ui/api/Fetchplayer";
import { useRouter } from "next/navigation";
import GlobalImage from "@/app/components/ui/img/GlobalImage";
import NormalText from "@/app/components/ui/text/NormalText";
import GlobalTag from "@/app/components/ui/tags/GlobalTag";
import ButtonSmall from "@/app/components/ui/buttons/ButtonSmall";
import SkeletonHeader from "@/app/components/ui/skeletons/SkeletonHeader";
import SecondaryHeading from "@/app/components/ui/text/SecondaryHeading";
import getLocalDateMinusMonths from "@/app/components/ui/api/getLocalTime";
import PlayerStatsBox from "@/app/components/ui/boxes/PlayerStatsBox";
import ChipCarousel from "@/app/components/ui/chips/ChipCarousel";
import SkeletonPlayerStatsLoading from "@/app/components/ui/skeletons/SkeletonPlayerStatsLoading";
import PlayerEventsBox from "@/app/components/ui/boxes/PlayerEventsBox";
import SkeletonPlayerEventsBox from "@/app/components/ui/skeletons/SkeletonPlayerEventsBox";
import SkeletonPlayerEventsLoading from "@/app/components/ui/skeletons/SkeletonPlayerEventsLoading";
import ActiveRosterBox from "@/app/components/ui/boxes/ActiveRosterBox";
import SkeletonRosterBox from "@/app/components/ui/skeletons/SkeletonRosterBox";

const PlayerPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const goToTeam = (id) => {
    router.push(`/teams/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
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
      try {
        const date = getLocalDateMinusMonths(12);
        console.log(date);
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
                      <GlobalImage
                        imageSrc={player.team.image}
                        altText={player.team.name}
                      />
                    ) : (
                      <GlobalImage
                        imageSrc="/static/images/rocketleague.svg"
                        altText={player.tag}
                      />
                    )}
                  </div>
                  <div className="player-names-wrapper">
                    <SecondaryHeading text={player.tag} />
                    <div className="player-name-team-wrapper">
                      {player.name ? <NormalText text={player.name} /> : null}
                      {player.country ? (
                        <GlobalTag text={player.country} />
                      ) : null}
                      {player.team ? (
                        <ButtonSmall
                          text={player.team.name}
                          onClick={() => goToTeam(player.team._id)}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <NormalText text={"We can't find that player :'("} />
            )}
          </div>
          <ChipCarousel />
        </div>
      )}
      <div className="boxes-wrapper">
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

        {player && player.team ? (
          <ActiveRosterBox id={player.team._id} heading="Active Teammates" />
        ) : (
          <SkeletonRosterBox text="N/A" heading="Active Teammates" finePrintHeading="COUNTRY"/>
        )}
      </div>
    </>
  );
};

export default PlayerPage;
