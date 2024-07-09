"use client";
import { useEffect, useState } from "react";
import getTeamByID from "@/app/components/ui/FetchTeam";
import NavBar from "@/app/components/ui/NavBar";
import GlobalImage from "@/app/components/ui/GlobalImage";
import SecondaryHeading from "@/app/components/ui/SecondaryHeading";
import NormalText from "@/app/components/ui/NormalText";
import GlobalTag from "@/app/components/ui/GlobalTag";
import Loading from "@/app/loading";

const TeamPage = ({ params }) => {
  const { id } = params;
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeamByID(id);
        console.log(data);
        setTeam(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="team-header-wrapper">
          {team ? (
            <div className="team-img-name-wrapper">
              <div className="team-image-wrapper">
                {team.image ? (
                  <GlobalImage imageSrc={team.image} altText={team.name} />
                ) : (
                  <GlobalImage
                    imageSrc="/static/images/rocketleague.svg"
                    altText={team.name}
                  />
                )}
              </div>
              <div className="team-names-wrapper">
                <SecondaryHeading text={team.name} />
                {team.region ? (
                  <GlobalTag text={team.region} />
                ) : (
                  <GlobalTag text="?" />
                )}
              </div>
            </div>
          ) : (
            <NormalText text="We can't find that team :'(" />
          )}
        </div>
      )}
    </>
  );
};

export default TeamPage;
