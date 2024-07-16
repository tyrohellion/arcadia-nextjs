import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";
import SkeletonEventDetailsLoading from "../skeletons/SkeletonEventDetailsLoading";
import prettyDate from "../api/prettyDate";
import prettyTime from "../api/prettyTime";
import FinePrintPrizeTag from "../tags/FinePrintPrizeTag";
import SmallText from "../text/SmallText";

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
            {results.map((stage) => (
              <>
                <li className="small-box-list-item" key={stage.name}>
                  <a href={stage.liquipedia} target="_blank" />
                  <div className="player-stats-bar-wrapper">
                    <div className="stat-name-wrapper">
                      <div className="event-stage-text-wrapper">
                        <div className="margin-right-text-box">
                          <FinePrint
                            text={
                              stage.startDate
                                ? prettyTime(stage.startDate)
                                : null
                            }
                          />
                          <FinePrint
                            text={
                              stage.startDate
                                ? prettyDate(stage.startDate)
                                : null
                            }
                          />
                        </div>
                        <div className="stage-name-icon-wrapper">
                          <SmallText text={stage.name ? stage.name : null} />
                          <img src="/static/images/externallink.png" />
                        </div>
                      </div>
                      <div className="num-games-player-stats-box-wrapper">
                        <FinePrintPrizeTag
                          amount={
                            stage.prize && stage.prize.amount
                              ? stage.prize.amount
                              : null
                          }
                          unit={
                            stage.prize && stage.prize.unit
                              ? stage.prize.unit
                              : null
                          }
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
              </>
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
