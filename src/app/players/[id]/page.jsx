"use client";
import { useEffect, useState } from "react";
import getPlayerByID from "@/app/components/ui/api/Fetchplayer";
import { useRouter } from "next/navigation";
import GlobalImage from "@/app/components/ui/img/GlobalImage";
import MainHeading from "@/app/components/ui/text/MainHeading";
import NormalText from "@/app/components/ui/text/NormalText";
import GlobalTag from "@/app/components/ui/tags/GlobalTag";
import ButtonSmall from "@/app/components/ui/buttons/ButtonSmall";
import SkeletonHeader from "@/app/components/ui/skeletons/SkeletonHeader";

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

  return (
    <>
      {isLoading ? (
        <SkeletonHeader />
      ) : (
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
                  <MainHeading text={player.tag} />
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
      )}
    </>
  );
};

export default PlayerPage;
