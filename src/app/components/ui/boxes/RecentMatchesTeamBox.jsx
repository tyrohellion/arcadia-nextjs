import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import CardHeader from "../text/CardHeader";
import SmallText from "../text/SmallText";
import FetchTeamMatchesOverview from "../api/FetchTeamMatchesOverview";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import NormalTextBlue from "../text/NormalTextBlue";
import SkeletonRecentMatchesOverviewLoading from "../skeletons/SkeletonRecentMatchesOverviewLoading";
import FinePrint from "../text/FinePrint";
import prettyDate from "../api/prettyDate";

const RecentMatchesTeamBox = ({ id }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const data = await FetchTeamMatchesOverview(id);
        if (data) {
          setResults(data);
        } else {
          console.error("No matches data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching recent matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [id]);

  const handleClick = (key) => {
    router.push(`/matches/${key}`);
  };

  console.log(results);

  return (
    <>
      {isLoading ? (
        <SkeletonRecentMatchesOverviewLoading NoData="" />
      ) : (
        <div className="heading-small-box-wrapper">
          <div className="headings-wrapper">
            <CardHeader text="Recent Matches" />
          </div>
          {Array.isArray(results) && results.length > 0 ? (
            <ul className="global-small-box-matches">
              {results.map((result) =>
                result.blue.winner || result.orange.winner ? (
                  <li
                    className="small-box-list-item-matches"
                    key={result._id}
                    onClick={() => handleClick(result._id)}
                  >
                    <div className="recent-matches-blue-wrapper">
                      <NormalTextBlue
                        text={result.blue.score ? result.blue.score : "0"}
                      />
                      <SmallText text={result.blue.team.team.name} />
                      {result.blue.winner ? (
                        <FinePrintTagWrapped text="WINNER" />
                      ) : null}
                    </div>
                    <div className="recent-matches-orange-wrapper">
                      <NormalTextBlue
                        text={result.orange.score ? result.orange.score : "0"}
                      />
                      <SmallText text={result.orange.team.team.name} />
                      {result.orange.winner ? (
                        <FinePrintTagWrapped text="WINNER" />
                      ) : null}
                    </div>
                    <FinePrint text={prettyDate(result.date)}/>
                    <div className="rating-pill"></div>
                  </li>
                ) : null
              )}
            </ul>
          ) : (
            <SkeletonRecentMatchesOverviewLoading NoData="No Data" />
          )}
        </div>
      )}
    </>
  );
};

export default RecentMatchesTeamBox;
