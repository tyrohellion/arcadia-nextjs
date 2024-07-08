"use client";
import { useEffect, useState } from "react";
import getTeamByID from "@/app/components/ui/FetchTeam";
import NavBar from "@/app/components/ui/NavBar";

const teamPage = ({ params }) => {
  const { id } = params;
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeamByID(id);
        console.log(data);
        setTeam(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="team-header-wrapper">
        {team ? (
          <>
            <div className="team-img-name-wrapper">
              <div className="team-image-wrapper">
                {team.image ? (
                  <img
                    src={team.image}
                    alt={team.name}
                    className="team-team-image"
                  ></img>
                ) : null}
              </div>
              <div className="team-names-wrapper">
                <h1 className="team-tag">{team.name}</h1>
                {team.region ? (<p>{team.region}</p>) : <p>?</p>}
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

export default teamPage;
