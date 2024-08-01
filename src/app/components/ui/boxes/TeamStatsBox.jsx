import React, { useState, useEffect, useRef } from "react";
import CardHeader from "../text/CardHeader";
import SkeletonPlayerStatsBox from "../skeletons/SkeletonPlayerStatsBox";
import getLocalDateMinusMonths from "../api/getLocalTime";
import NormalText from "../text/NormalText";
import FinePrint from "../text/FinePrint";
import SkeletonPlayerStatsLoading from "../skeletons/SkeletonPlayerStatsLoading";
import getTeamStatsOverview from "../api/FetchTeamStatsOverview";
import prettyDate from "../api/prettyDate";

const TeamStatsBox = ({ id }) => {
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
        const data = await getTeamStatsOverview(id, time);
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

  console.log(results);

  return (
    <>
      {isloading ? (
        <SkeletonPlayerStatsLoading />
      ) : Array.isArray(results) && results.length > 0 ? (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Stats Overview" />
            <FinePrint text="LAST 6 MONTHS" />
          </div>
          <ul className="global-small-box">
            {results.map((stats) => (
              <li className="small-box-list-item" key={`rating-${stats.team._id}`}>
                <div className="player-stats-bar-wrapper">
                  <div className="stat-name-wrapper">
                    <div className="player-tag-roster">
                      <NormalText
                        text={
                          (
                            (stats.games.wins / stats.games.total) * 100
                          ).toFixed(2) + "%"
                        }
                      />
                      <FinePrint text="WIN%" />
                    </div>
                    <div className="num-games-player-stats-box-wrapper">
                      <FinePrint text="GAMES" />
                      <div className="stat-label">{Math.trunc(stats.games.total)}</div>
                    </div>
                  </div>
                  <div
                    className="rating-pill"
                    style={{
                      "--progress": `${(stats.games.wins / stats.games.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </li>
            ))}
            {results.map((stats) => (
              <li className="small-box-list-item" key={`score-${stats.team._id}`}>
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
                      <FinePrint text="MATCHES" />
                      <div className="stat-label">
                        {stats.matches.total}
                      </div>
                    </div>
                  </div>
                  <div
                    className="score-pill"
                    style={{
                      "--progress": `${(stats.stats.score / stats.games.total / 2100) * 100}%`,
                    }}
                  ></div>
                </div>
              </li>
            ))}
            {results.map((stats) => (
              <li className="small-box-list-item" key={`goals-${stats.team._id}`}>
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
                      "--progress": `${(stats.stats.goals / stats.games.total / 4) * 100}%`,
                    }}
                  ></div>
                </div>
              </li>
            ))}
            {results.map((stats) => (
              <li className="small-box-list-item" key={`shotper-${stats.team._id}`}>
                <div className="player-stats-bar-wrapper">
                  <div className="stat-name-wrapper">
                    <div className="player-tag-roster">
                      <NormalText
                        text={
                          (
                            (stats.stats.goals / stats.stats.shots) * 100
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
                      "--progress": `${(stats.stats.goals / stats.stats.shots) * 100}%`,
                    }}
                  ></div>
                </div>
              </li>
            ))}
            {results.map((stats) => (
              <li className="small-box-list-item" key={`saves-${stats.team._id}`}>
                <div className="player-stats-bar-wrapper">
                  <div className="stat-name-wrapper">
                    <div className="margin-right-text-box">
                      <FinePrint text={prettyDate(stats.startDate)} />
                    </div>
                    <div className="num-games-player-stats-box-wrapper">
                      <FinePrint text="Age of Data" />
                    </div>
                  </div>
                  <div
                    className="rating-pill"
                    style={{
                      "--progress": "0%",
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <SkeletonPlayerStatsBox />
      )}
    </>
  );
};

export default TeamStatsBox;
