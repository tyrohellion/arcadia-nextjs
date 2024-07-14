import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";
import SmallText from "../text/SmallText";

const PlayerLinksBox = ({ steamID }) => {
  const ballchasingURL = "https://ballchasing.com/player/steam/" + steamID;
  const trackerURL =
    "https://rocketleague.tracker.network/rocket-league/profile/steam/" +
    steamID +
    "/overview";
  const steamURL = "https://steamcommunity.com/profiles/" + steamID;

  return (
    <>
      <div className="heading-small-box-wrapper">
        <div className="headings-wrapper">
          <CardHeader text="Player Links" />
        </div>

        <ul className="global-small-box">
          <>
            <li className="small-box-list-item-player-links" key={ballchasingURL}>
              <a
                href={ballchasingURL}
                target="_blank"
                className="player-links"
              />
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <SmallText text="Ballchasing Info" />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="REPLAYS" />
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
            <li className="small-box-list-item-player-links" key={trackerURL}>
              <a href={trackerURL} target="_blank" className="player-links" />
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <SmallText text="Rocket League Tracker" />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="RANKS" />
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
            <li className="small-box-list-item-player-links" key={steamURL}>
              <a href={steamURL} target="_blank" className="player-links" />
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <SmallText text="Steam Account" />
                  </div>
                  <div className="num-games-player-stats-box-wrapper">
                    <FinePrint text="STEAM" />
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

export default PlayerLinksBox;
