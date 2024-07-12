import React, { useState, useEffect, useRef } from "react";
import CardHeader from "../text/CardHeader";
import SkeletonPlayerStatsBox from "../skeletons/SkeletonPlayerStatsBox";
import getLocalDateMinusMonths from "../api/getLocalTime";
import getPlayerStatsOverview from "../api/FetchPlayerStatsOverview";
import NormalText from "../text/NormalText";
import FinePrint from "../text/FinePrint";
import SkeletonPlayerStatsLoading from "../skeletons/SkeletonPlayerStatsLoading";

const EventDetailsBox = ({ id }) => {
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const data = getLocalDateMinusMonths(0);
        setTime(data);
      } catch (error) {
        console.error("Error fetching date:", error);
      }
    };

    fetchTime();
  }, []);

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
      {isloading ? (
        <SkeletonPlayerStatsLoading />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Stats Overview" />
            <FinePrint text="LAST 6 MONTHS" />
          </div>
          {Array.isArray(results) && results.length > 0 ? (
            <ul className="global-small-box">
              {results.map((stats) => (
                <React.Fragment key={stats.player._id}>
                  <li
                    className="small-box-list-item"
                    key={`rating-${stats.player._id}`}
                  >
                    <div className="player-stats-bar-wrapper">
                      <div className="stat-name-wrapper">
                        <div className="player-tag-roster">
                          <NormalText
                            text={(
                              stats.stats.rating / stats.games.total
                            ).toFixed(3)}
                          />
                          <FinePrint text="RATING" />
                        </div>
                        <div className="num-games-player-stats-box-wrapper">
                          <FinePrint text="MATCHES" />
                          <div className="stat-label">
                            {stats.matches.total}
                          </div>
                        </div>
                      </div>
                      <div
                        className="rating-pill"
                        style={{
                          "--progress":
                            (stats.stats.rating / stats.games.total / 2.0) *
                              100 +
                            "%",
                        }}
                      ></div>
                    </div>
                  </li>
                  <li
                    className="small-box-list-item"
                    key={`score-${stats.player._id}`}
                  >
                    <div className="player-stats-bar-wrapper">
                      <div className="stat-name-wrapper">
                        <div className="player-tag-roster">
                          <NormalText
                            text={(
                              stats.stats.score / stats.games.total
                            ).toFixed(2)}
                          />
                          <FinePrint text="SCORE PER GAME" />
                        </div>
                        <div className="num-games-player-stats-box-wrapper">
                          <FinePrint text="GAMES" />
                          <div className="stat-label">{stats.games.total}</div>
                        </div>
                      </div>
                      <div
                        className="score-pill"
                        style={{
                          "--progress":
                            (stats.stats.score / stats.games.total / 700) *
                              100 +
                            "%",
                        }}
                      ></div>
                    </div>
                  </li>
                  <li
                    className="small-box-list-item"
                    key={`goals-${stats.player._id}`}
                  >
                    <div className="player-stats-bar-wrapper">
                      <div className="stat-name-wrapper">
                        <div className="player-tag-roster">
                          <NormalText
                            text={(
                              stats.stats.goals / stats.games.total
                            ).toFixed(2)}
                          />
                          <FinePrint text="GOALS PER GAME" />
                        </div>
                        <div className="num-games-player-stats-box-wrapper">
                          <FinePrint text="GOALS" />
                          <div className="stat-label">{stats.stats.goals}</div>
                        </div>
                      </div>
                      <div
                        className="goals-pill"
                        style={{
                          "--progress":
                            (stats.stats.goals / stats.games.total / 1.5) *
                              100 +
                            "%",
                        }}
                      ></div>
                    </div>
                  </li>
                  <li
                    className="small-box-list-item"
                    key={`shotper-${stats.player._id}`}
                  >
                    <div className="player-stats-bar-wrapper">
                      <div className="stat-name-wrapper">
                        <div className="player-tag-roster">
                          <NormalText
                            text={
                              (
                                (stats.stats.goals / stats.stats.shots) *
                                100
                              ).toFixed(2) + "%"
                            }
                          />
                          <FinePrint text="SHOOTING %" />
                        </div>
                        <div className="num-games-player-stats-box-wrapper">
                          <FinePrint text="SHOTS" />
                          <div className="stat-label">{stats.stats.shots}</div>
                        </div>
                      </div>
                      <div
                        className="shooting-pill"
                        style={{
                          "--progress":
                            (stats.stats.goals / stats.stats.shots) * 100 + "%",
                        }}
                      ></div>
                    </div>
                  </li>
                  <li
                    className="small-box-list-item"
                    key={`saves-${stats.player._id}`}
                  >
                    <div className="player-stats-bar-wrapper">
                      <div className="stat-name-wrapper">
                        <div className="player-tag-roster">
                          <NormalText
                            text={
                              stats.stats.goalParticipation.toFixed(2) + "%"
                            }
                          />
                          <FinePrint text="GOAL PART." />
                        </div>
                        <div className="num-games-player-stats-box-wrapper">
                          <FinePrint text="ASSISTS" />
                          <div className="stat-label">
                            {stats.stats.assists}
                          </div>
                        </div>
                      </div>
                      <div
                        className="goalpart-pill"
                        style={{
                          "--progress":
                            stats.stats.goalParticipation.toFixed(2) + "%",
                        }}
                      ></div>
                    </div>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          ) : (
            <SkeletonPlayerStatsBox text="N/A" />
          )}
        </div>
      )}
    </>
  );
};

export default EventDetailsBox;
