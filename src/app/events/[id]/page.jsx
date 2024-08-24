"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NormalText from "../../components/ui/text/NormalText";
import SkeletonHeader from "../../components/ui/skeletons/SkeletonHeader";
import EventDetailsBox from "../../components/ui/boxes/EventDetailsBox";
import prettyDate from "../../components/ui/api/prettyDate";
import prettyTime from "../../components/ui/api/prettyTime";
import regionFormatter from "../../components/ui/api/regionFormatter";
import tierFormatter from "../../components/ui/api/tierFormatter";
import modeFormatter from "../../components/ui/api/modeFormatter";
import SkeletonEventDetailsLoading from "../../components/ui/skeletons/SkeletonEventDetailsLoading";
import EventsChipCarousel from "../../components/ui/chips/EventsChipCarousel";
import SmallHeading from "../../components/ui/text/SmallHeading";
import SkeletonRecentMatchesOverviewLoading from "../../components/ui/skeletons/SkeletonRecentMatchesOverviewLoading";
import RecentMatchesUpcomingEventBox from "../../components/ui/boxes/RecentMatchesUpcomingEventBox";
import EventStagesBox from "../../components/ui/boxes/EventStagesBox";
import EventResults from "../../components/ui/content/EventResults";
import EventParticipantBox from "../../components/ui/boxes/EventParticipantBox";
import getEventByID from "../../components/ui/api/FetchEvent";
import FinePrint from "../../components/ui/text/FinePrint";

const EventPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const pageView = searchParams.get("view");

  useEffect(() => {
    if (!pageView) {
      router.replace(`?view=Overview`);
    }
  }, [pageView, router, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEventByID(id);
        console.log(data);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
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
        <div className="event-header-wrapper">
          {event ? (
            <>
              <div className="event-img-tags-wrapper">
                <div className="event-image-wrapper">
                  {event.image ? (
                    <img
                      src={event.image}
                      width="70"
                      height="70"
                      alt={event.name ? event.name : "No Event Name"}
                      className="global-small-image"
                    />
                  ) : (
                    <img
                      src="/static/images/rocketleague.svg"
                      width="70"
                      height="70"
                      alt={event.name ? event.name : "No Event Name"}
                      className="global-small-image"
                    />
                  )}
                </div>
                <div className="event-names-wrapper">
                  <SmallHeading
                    text={event.name ? event.name : "No Event Name"}
                  />
                </div>
              </div>
            </>
          ) : (
            <NormalText text={"We can't find that event :'("} />
          )}
        </div>
      )}
      <EventsChipCarousel />
      {pageView === "Overview" ? (
        <div className="boxes-wrapper">
          <div className="event-details-stages-wrapper">
            {event ? (
              <EventDetailsBox
                startDate={
                  event.start_date
                    ? prettyDate(event.start_date)
                    : "No Event Start Date"
                }
                endDate={
                  event.end_date
                    ? prettyDate(event.end_date)
                    : "No Event End Date"
                }
                startTime={
                  event.start_date
                    ? prettyTime(event.start_date)
                    : "No Event Start Time"
                }
                endTime={
                  event.end_date
                    ? prettyTime(event.end_date)
                    : "No Event Start Time"
                }
                region={
                  event.region
                    ? regionFormatter(event.region)
                    : "No Event Region"
                }
                mode={event.mode ? modeFormatter(event.mode) : "No Event Mode"}
                tier={event.tier ? tierFormatter(event.tier) : "No Event Tier"}
              />
            ) : (
              <SkeletonEventDetailsLoading />
            )}
            {event ? (
              <EventStagesBox stages={event.stages} />
            ) : (
              <SkeletonEventDetailsLoading />
            )}
          </div>
          {event ? (
            <RecentMatchesUpcomingEventBox id={event.slug} />
          ) : (
            <SkeletonRecentMatchesOverviewLoading />
          )}
        </div>
      ) : null}
      {pageView === "Matches" && event ? (
        <EventResults id={event.slug} />
      ) : null}
      {pageView === "Stats" && event ? (
        <div className="event-stats-wrapper">
          <FinePrint text="Under Construction" />
        </div>
      ) : null}
      {pageView === "Participants" ? (
        <>
          <div className="event-participants-wrapper">
            <FinePrint text="Participants are currently down due to API issues" />
            <EventParticipantBox id={id} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default EventPage;
