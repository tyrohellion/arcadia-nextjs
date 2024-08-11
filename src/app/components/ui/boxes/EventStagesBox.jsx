import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";
import SkeletonEventDetailsLoading from "../skeletons/SkeletonEventDetailsLoading";
import prettyDate from "../api/prettyDate";
import prettyTime from "../api/prettyTime";
import FinePrintPrizeTag from "../tags/FinePrintPrizeTag";
import SmallText from "../text/SmallText";
import countryFormatter from "../api/countryFormatter";

const EventStagesBox = ({ stages }) => {
  const results = stages;
  return (
    <>
      {Array.isArray(results) && results.length > 0 ? (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Event Stages" />
            <FinePrint text="PRIZE" />
          </div>

          <ul className="global-small-box">
            {results.map((stage, index) => (
              <li className="small-box-list-item" key={stage?.id || index}>
                <a
                  href={stage?.liquipedia || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <div className="player-stats-bar-wrapper">
                  <div className="stat-name-wrapper">
                    <div className="event-stage-text-wrapper">
                      <div className="stage-name-icon-wrapper">
                        <SmallText text={stage?.name || null} />
                        <img
                          src="/static/images/externallink.png"
                          width="16"
                          height="16"
                          alt="External Link"
                        />
                      </div>
                      <div className="margin-right-text-box">
                        <div className="time-date-icon-wrapper">
                          <img
                            src="/static/images/calendar.png"
                            width="16"
                            height="16"
                            alt="Calendar"
                          />
                          <div className="time-date-stage-wrapper">
                            <FinePrint
                              text={
                                stage?.startDate
                                  ? prettyTime(stage.startDate)
                                  : null
                              }
                            />
                            <FinePrint
                              text={
                                stage?.startDate
                                  ? prettyDate(stage.startDate)
                                  : null
                              }
                            />
                          </div>
                        </div>
                        {stage?.location &&
                        stage.location.venue &&
                        stage.location.country &&
                        stage.location.city ? (
                          <div className="lan-stages-icon-wrapper">
                            <img
                              src="/static/images/location.png"
                              width="16"
                              height="16"
                              alt="Location"
                            />
                            <div className="lan-stages-wrapper">
                              <FinePrint text={stage.location.venue || null} />
                              <FinePrint
                                text={
                                  stage.location.city
                                    ? `${
                                        stage.location.city
                                      }, ${countryFormatter(
                                        stage.location.country
                                      )}`
                                    : null
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="num-games-player-stats-box-wrapper">
                      <FinePrintPrizeTag
                        amount={stage?.prize?.amount || null}
                        unit={stage?.prize?.unit || null}
                      />
                    </div>
                  </div>
                  <div
                    className="rating-pill"
                    style={{
                      "--progress": 0 + "%",
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <SkeletonEventDetailsLoading />
      )}
    </>
  );
};

export default EventStagesBox;
