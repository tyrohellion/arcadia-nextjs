"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getTeamByID from "@/app/components/ui/api/FetchTeam";
import NormalText from "@/app/components/ui/text/NormalText";
import ActiveRosterBox from "@/app/components/ui/boxes/ActiveRosterBox";
import SkeletonHeader from "@/app/components/ui/skeletons/SkeletonHeader";
import SkeletonRosterBoxLoading from "@/app/components/ui/skeletons/SkeletonRosterBoxLoading";
import GlobalSmallImage from "@/app/components/ui/img/GlobalSmallImage";
import SmallHeading from "@/app/components/ui/text/SmallHeading";
import regionFormatter from "@/app/components/ui/api/regionFormatter";
import SmallTagLowercase from "@/app/components/ui/tags/SmallTagLowercase";
import RecentMatchesTeamBox from "@/app/components/ui/boxes/RecentMatchesTeamBox";
import SkeletonRecentMatchesOverviewLoading from "@/app/components/ui/skeletons/SkeletonRecentMatchesOverviewLoading";
import TeamEventsBox from "@/app/components/ui/boxes/TeamEventsBox";
import TeamChipCarousel from "@/app/components/ui/chips/TeamChipCarousel";

const TeamPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);
  const searchParams = useSearchParams();
  const pageView = searchParams.get("view");

  useEffect(() => {
    if (!pageView) {
      router.replace(`?view=Overview`);
    }
  }, [pageView, router, id]);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
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
          <TeamChipCarousel />
        </>
      ) : (
        <div className="header-chip-wrapper">
          <div className="team-header-wrapper">
            {team ? (
              <div className="team-img-name-wrapper">
                <div className="team-image-wrapper">
                  {team.image ? (
                    <GlobalSmallImage
                      imageSrc={team.image}
                      altText={team.name}
                    />
                  ) : (
                    <GlobalSmallImage
                      imageSrc="/static/images/rocketleague.svg"
                      altText={team.name}
                    />
                  )}
                </div>
                <div className="team-names-wrapper">
                  <SmallHeading text={team.name} />
                  {team.region ? (
                    <SmallTagLowercase text={regionFormatter(team.region)} />
                  ) : (
                    <SmallTagLowercase text="No region data" />
                  )}
                </div>
              </div>
            ) : (
              <NormalText text="We can't find that team :'(" />
            )}
          </div>
          <TeamChipCarousel />
        </div>
      )}
      {pageView === "Overview" ? (
      <div className="boxes-wrapper">
        <div className="team-roster-events-wrapper">
          {team ? (
            <ActiveRosterBox id={team._id} teamName={team.name} />
          ) : (
            <SkeletonRosterBoxLoading />
          )}
          {team ? (
            <TeamEventsBox id={team._id} />
          ) : (
            <SkeletonRecentMatchesOverviewLoading NoData="" />
          )}
        </div>
        {team ? (
          <RecentMatchesTeamBox id={team._id} />
        ) : (
          <SkeletonRecentMatchesOverviewLoading NoData="" />
        )}
      </div>
      ) : null}
    </>
  );
};

export default TeamPage;
