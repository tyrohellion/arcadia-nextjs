import React from "react";
import CardHeader from "../text/CardHeader";
import FinePrint from "../text/FinePrint";
import SmallText from "../text/SmallText";

const PlayerDetailsBox = ({ name, country, team, steamID }) => {
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
            <li
              className="small-box-list-item-player-links"
              key={ballchasingURL}
            >
              <a
                href={ballchasingURL}
                target="_blank"
                className="player-links"
              />
              <div className="player-stats-bar-wrapper">
                <div className="stat-name-wrapper">
                  <div className="margin-right-text-box">
                    <div className="small-text-icon-wrapper">
                      <SmallText text="Ballchasing Info" />
                      <img src="/static/images/externallink.png" width="16" height="16" alt="external link icon"/>
                    </div>
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
                    <div className="small-text-icon-wrapper">
                      <SmallText text="Rocket League Tracker" />
                      <img src="/static/images/externallink.png" width="16" height="16" alt="external link icon"/>
                    </div>
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
                    <div className="small-text-icon-wrapper">
                      <SmallText text="Steam Account" />
                      <img src="/static/images/externallink.png" width="16" height="16" alt="external link icon"/>
                    </div>
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

export default PlayerDetailsBox;
