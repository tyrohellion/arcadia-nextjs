import React from "react";
import CardHeader from "../text/CardHeader";
import NormalText from "../text/NormalText";
import FinePrint from "../text/FinePrint";
import SmallText from "../text/SmallText";

const PlayerDetailsBox = ({ name, country, team, level }) => {
  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Player Details" />
        </div>

        <ul className="global-small-box">
          <>
            <li className="small-box-list-item" key={name}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <SmallText text={name} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="NAME" />
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
            <li className="small-box-list-item" key={country}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <SmallText text={country} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="COUNTRY" />
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
            <li className="small-box-list-item" key={team}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <SmallText text={team} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="TEAM" />
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
            <li className="small-box-list-item" key={level}>
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <NormalText text={level} />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="VERIFICATION" />
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

export default PlayerDetailsBox;
