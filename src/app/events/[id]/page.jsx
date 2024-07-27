"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getEventByID from "@/app/components/ui/api/FetchEvent";
import NormalText from "@/app/components/ui/text/NormalText";
import SkeletonHeader from "@/app/components/ui/skeletons/SkeletonHeader";
import EventDetailsBox from "@/app/components/ui/boxes/EventDetailsBox";
import prettyDate from "@/app/components/ui/api/prettyDate";
import prettyTime from "@/app/components/ui/api/prettyTime";
import regionFormatter from "@/app/components/ui/api/regionFormatter";
import tierFormatter from "@/app/components/ui/api/tierFormatter";
import modeFormatter from "@/app/components/ui/api/modeFormatter";
import SkeletonEventDetailsLoading from "@/app/components/ui/skeletons/SkeletonEventDetailsLoading";
import EventsChipCarousel from "@/app/components/ui/chips/EventsChipCarousel";
import SmallHeading from "@/app/components/ui/text/SmallHeading";
import GlobalSmallImage from "@/app/components/ui/img/GlobalSmallImage";
import SkeletonRecentMatchesOverviewLoading from "@/app/components/ui/skeletons/SkeletonRecentMatchesOverviewLoading";
import RecentMatchesUpcomingEventBox from "@/app/components/ui/boxes/RecentMatchesUpcomingEventBox";
import EventStagesBox from "@/app/components/ui/boxes/EventStagesBox";
import EventResults from "@/app/components/ui/content/EventResults";

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
                    <GlobalSmallImage
                      imageSrc={event.image}
                      altText={event.name}
                    />
                  ) : (
                    <GlobalSmallImage
                      imageSrc="/static/images/rocketleague.svg"
                      altText={event.name}
                    />
                  )}
                </div>
                <div className="event-names-wrapper">
                  <SmallHeading text={event.name} />
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
                startDate={event.startDate ? prettyDate(event.startDate) : null}
                endDate={event.endDate ? prettyDate(event.endDate) : null}
                startTime={event.startDate ? prettyTime(event.startDate) : null}
                endTime={event.endDate ? prettyTime(event.endDate) : null}
                region={event.region ? regionFormatter(event.region) : null}
                mode={event.mode ? modeFormatter(event.mode) : null}
                tier={event.tier ? tierFormatter(event.tier) : null}
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
            <RecentMatchesUpcomingEventBox id={event._id} />
          ) : (
            <SkeletonRecentMatchesOverviewLoading />
          )}
        </div>
      ) : null}
      {pageView === "Matches" ? <EventResults id={id} /> : null}
    </>
  );
};

export default EventPage;
