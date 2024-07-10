"use client";
import { useEffect, useState } from "react";
import getTeamByID from "@/app/components/ui/api/FetchTeam";
import GlobalImage from "@/app/components/ui/img/GlobalImage";
import SecondaryHeading from "@/app/components/ui/text/SecondaryHeading";
import NormalText from "@/app/components/ui/text/NormalText";
import GlobalTag from "@/app/components/ui/tags/GlobalTag";
import ActiveRosterBox from "@/app/components/ui/boxes/ActiveRosterBox";
import SkeletonRosterBox from "@/app/components/ui/skeletons/SkeletonRosterBox";
import ChipCarousel from "@/app/components/ui/chips/ChipCarousel";
import SkeletonHeader from "@/app/components/ui/skeletons/SkeletonHeader";

const TeamPage = ({ params }) => {
  const { id } = params;
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showComponent, setShowComponent] = useState(true);

  const displayComponent = () => {
    setShowComponent(false);
  };

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
      {isLoading ? (
        <>
          <SkeletonHeader />
          <ChipCarousel />
        </>
      ) : (
        <div className="header-chip-wrapper">
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
          <ChipCarousel />
        </div>
      )}
      <div className="boxes-wrapper">
        {team ? <ActiveRosterBox id={team._id} /> : <SkeletonRosterBox />}
      </div>
    </>
  );
};

export default TeamPage;
