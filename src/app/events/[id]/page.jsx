"use client";
import { useEffect, useState } from "react";
import getEventByID from "@/app/components/ui/api/FetchEvent";
import { useRouter } from "next/navigation";
import GlobalImage from "@/app/components/ui/img/GlobalImage";
import SecondaryHeading from "@/app/components/ui/text/SecondaryHeading";
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

const EventPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const goToTeam = (id) => {
    router.push(`/teams/${id}`);
  };

  const goToPlayer = (id) => {
    router.push(`/players/${id}`);
  };

  const goToEvent = (id) => {
    router.push(`/events/${id}`);
  };

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
        <>
          <SkeletonHeader />
        </>
      ) : (
        <div className="event-header-wrapper">
          {event ? (
            <>
              <div className="event-img-tags-wrapper">
                <div className="event-image-wrapper">
                  {event.image ? (
                    <GlobalImage imageSrc={event.image} altText={event.name} />
                  ) : (
                    <GlobalImage
                      imageSrc="/static/images/rocketleague.svg"
                      altText={event.name}
                    />
                  )}
                </div>
                <div className="event-names-wrapper">
                  <SecondaryHeading text={event.name} />
                </div>
              </div>
            </>
          ) : (
            <NormalText text={"We can't find that event :'("} />
          )}
        </div>
      )}
      <EventsChipCarousel />
      <div className="boxes-wrapper">
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
      </div>
    </>
  );
};

export default EventPage;
