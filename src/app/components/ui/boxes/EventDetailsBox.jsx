import React from "react";
import CardHeader from "../text/CardHeader";
import NormalText from "../text/NormalText";
import FinePrint from "../text/FinePrint";
import EvenSmallerText from "../text/EvenSmallerText";

const EventDetailsBox = ({
  startDate,
  endDate,
  startTime,
  endTime,
  region,
  mode,
  tier,
}) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Event Details" />
          <FinePrint text="" />
        </div>

        <ul className="global-small-box">
          <>
            <li className="small-box-list-item" key={startDate}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <FinePrint text={startTime} />
                    <EvenSmallerText text={startDate} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="START DATE" />
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
            <li className="small-box-list-item" key={endDate}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <FinePrint text={endTime} />
                    <EvenSmallerText text={endDate} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="END DATE" />
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
            <li className="small-box-list-item" key={region}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <NormalText text={region} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="REGION" />
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
            <li className="small-box-list-item" key={mode}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <NormalText text={mode} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="MODE" />
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
            <li className="small-box-list-item" key={tier}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <NormalText text={tier} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="TIER" />
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
        </ul>
      </div>
    </>
  );
};

export default EventDetailsBox;
