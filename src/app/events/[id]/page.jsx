"use client";
import { useEffect, useState } from "react";
import getEventByID from "@/app/components/ui/FetchEvent";
import NavBar from "@/app/components/ui/NavBar";
import { useRouter } from "next/navigation";
import GlobalImage from "@/app/components/ui/GlobalImage";
import SecondaryHeading from "@/app/components/ui/SecondaryHeading";
import NormalText from "@/app/components/ui/NormalText";
import GlobalTag from "@/app/components/ui/GlobalTag";
import Loading from "@/app/loading";
import PrizePoolTag from "@/app/components/ui/PrizePoolTag";
import TierTag from "@/app/components/ui/TierTag";
import PrettyDate from "@/app/components/ui/PrettyDate";

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
      <NavBar />
      {isLoading ? (
        <Loading />
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
                  <div className="event-name-tag-wrapper">
                    {event.startDate && event.endDate ? (
                      <PrettyDate date={event.startDate} />
                    ) : null}
                    <GlobalTag text="-"/>
                    {event.startDate && event.endDate ? (
                      <PrettyDate date={event.endDate} />
                    ) : null}
                    {event.prize.amount && event.prize.currency ? (
                      <PrizePoolTag
                        amount={event.prize.amount}
                        unit={event.prize.currency}
                      />
                    ) : null}
                    {event.tier ? <TierTag tier={event.tier} /> : null}
                    {event.region ? <GlobalTag text={event.region} /> : null}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <NormalText text={"We can't find that event :'("} />
          )}
        </div>
      )}
    </>
  );
};

export default EventPage;
