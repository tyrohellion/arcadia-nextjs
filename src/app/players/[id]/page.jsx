"use client";
import { useEffect, useState } from "react";
import getPlayerByID from "@/app/components/ui/Fetchplayer";
import NavBar from "@/app/components/ui/NavBar";
import { useRouter } from "next/navigation";

const playerPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [player, setPlayer] = useState(null);

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
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="player-header-wrapper">
        {player ? (
          <>
            <div className="player-img-name-wrapper">
              <div className="player-image-wrapper">
                {player.team && player.team.image ? (
                  <img
                    src={player.team.image}
                    alt={player.team.name}
                    className="player-team-image"
                  ></img>
                ) : null}
              </div>
              <div className="player-names-wrapper">
                <h1 className="player-tag">{player.tag}</h1>
                <div className="player-name-team-wrapper">
                  {player.name ? <p>{player.name}</p> : null}
                  {player.country ? (
                    <p className="player-region-page">{player.country}</p>
                  ) : null}
                  {player.team ? (
                    <p
                      className="player-team-name-page"
                      onClick={() => goToTeam(player.team._id)}
                    >
                      {player.team.name}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default playerPage;
