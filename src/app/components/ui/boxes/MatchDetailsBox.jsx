import React from "react";
import CardHeader from "../text/CardHeader";
import NormalText from "../text/NormalText";
import FinePrint from "../text/FinePrint";
import EvenSmallerText from "../text/EvenSmallerText";
import SmallText from "../text/SmallText";
import Link from "next/link";

const MatchDetailsBox = ({
  event,
  startDate,
  startTime,
  stage,
  type,
  mode,
  region,
  id
}) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Match Details" />
          <FinePrint text="" />
        </div>

        <ul className="global-small-box">
          <>
            <li className="small-box-list-item">
              <Link href={`/events/${id}`}/>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <SmallText text={event} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="EVENT" />
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
            <li className="small-box-list-item">
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <FinePrint text={startTime} />
                    <EvenSmallerText text={startDate} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="TIME" />
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
            <li className="small-box-list-item">
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <NormalText text={stage} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="STAGE" />
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
            <li className="small-box-list-item">
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <NormalText text={type} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="TYPE" />
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
            <li className="small-box-list-item">
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
            <li className="small-box-list-item">
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
          </>
        </ul>
      </div>
    </>
  );
};

export default MatchDetailsBox;
