"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getTeamByID from "@/app/components/ui/api/FetchTeam";
import NormalText from "@/app/components/ui/text/NormalText";
import ActiveRosterBox from "@/app/components/ui/boxes/ActiveRosterBox";
import SkeletonHeader from "@/app/components/ui/skeletons/SkeletonHeader";
import SkeletonRosterBoxLoading from "@/app/components/ui/skeletons/SkeletonRosterBoxLoading";
import SmallHeading from "@/app/components/ui/text/SmallHeading";
import regionFormatter from "@/app/components/ui/api/regionFormatter";
import SmallTagLowercase from "@/app/components/ui/tags/SmallTagLowercase";
import RecentMatchesTeamBox from "@/app/components/ui/boxes/RecentMatchesTeamBox";
import SkeletonRecentMatchesOverviewLoading from "@/app/components/ui/skeletons/SkeletonRecentMatchesOverviewLoading";
import TeamEventsBox from "@/app/components/ui/boxes/TeamEventsBox";
import TeamChipCarousel from "@/app/components/ui/chips/TeamChipCarousel";
import TeamStatsBox from "@/app/components/ui/boxes/TeamStatsBox";
import SkeletonPlayerStatsLoading from "@/app/components/ui/skeletons/SkeletonPlayerStatsLoading";
import TeamFormerMembersBox from "@/app/components/ui/boxes/TeamFormerMembersBox";
import TeamResults from "@/app/components/ui/content/TeamResults";
import SkeletonTeamEventsLoading from "@/app/components/ui/skeletons/SkeletonTeamEventsLoading";

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
                    <img
                      src={team.image}
                      width="70"
                      height="70"
                      alt={team.name ? team.name : "No Team Name Found"}
                      className="global-small-image"
                    />
                  ) : (
                    <img
                      src="/static/images/rocketleague.svg"
                      width="70"
                      height="70"
                      alt={team.name ? team.name : "No Team Name Found"}
                      className="global-small-image"
                    />
                  )}
                </div>
                <div className="team-names-wrapper">
                  <SmallHeading text={team.name ? team.name : "No Team Name Found"} />
                  {team.region ? (
                    <SmallTagLowercase text={regionFormatter(team.region)} />
                  ) : (
                    <SmallTagLowercase text="No region Found" />
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
        <>
          <div className="boxes-wrapper">
            <div className="team-roster-events-wrapper">
              {team ? (
                <ActiveRosterBox id={team._id ? team._id : null} teamName={team.name ? team.name : "No Team Name Found"} />
              ) : (
                <SkeletonRosterBoxLoading />
              )}
              {team ? (
                <TeamEventsBox id={team._id ? team._id : null} />
              ) : (
                <SkeletonTeamEventsLoading />
              )}
            </div>
            <div className="team-stats-other-wrapper">
              {team ? (
                <TeamStatsBox id={team._id ? team._id : null} />
              ) : (
                <SkeletonPlayerStatsLoading />
              )}

              {team ? (
                <TeamFormerMembersBox id={team._id ? team._id : null} />
              ) : (
                <SkeletonRosterBoxLoading />
              )}
            </div>
            {team ? (
              <RecentMatchesTeamBox id={team._id ? team._id : null} />
            ) : (
              <SkeletonRecentMatchesOverviewLoading NoData="" />
            )}
          </div>
        </>
      ) : null}
      {pageView === "Results" ? <TeamResults id={id} /> : null}
    </>
  );
};

export default TeamPage;
