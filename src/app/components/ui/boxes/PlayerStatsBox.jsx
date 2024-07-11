import React, { useState, useEffect, useRef } from "react";
import CardHeader from "../text/CardHeader";
import SkeletonPlayerStatsBox from "../skeletons/SkeletonPlayerStatsBox";
import getLocalDateMinusMonths from "../api/getLocalTime";
import getPlayerStatsOverview from "../api/FetchPlayerStatsOverview";
import NormalText from "../text/NormalText";
import FinePrint from "../text/FinePrint";

const PlayerStatsBox = ({ id }) => {
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const data = getLocalDateMinusMonths(6);
        setTime(data);
      } catch (error) {
        console.error("Error fetching date:", error);
      }
    };

    fetchTime();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const data = await getPlayerStatsOverview(id, time);
        if (data && data.stats) {
          setResults(data.stats);
        } else {
          console.error("No stats data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching player stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id && time !== "") {
      fetchStats();
    }
  }, [id, time]);

  return (
    <>
      {isloading ? (
        <SkeletonPlayerStatsBox />
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
                          <FinePrint text="GAMES" />
                          <div className="stat-label">{stats.games.total}</div>
                        </div>
                      </div>
                      <div className="empty-rating-pill"></div>
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
                      <div className="empty-rating-pill"></div>
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
                          <FinePrint text="GAMES" />
                          <div className="stat-label">{stats.games.total}</div>
                        </div>
                      </div>
                      <div className="empty-rating-pill"></div>
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
                      <div className="empty-rating-pill"></div>
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
                          <FinePrint text="GAMES" />
                          <div className="stat-label">{stats.games.total}</div>
                        </div>
                      </div>
                      <div className="empty-rating-pill"></div>
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

export default PlayerStatsBox;
