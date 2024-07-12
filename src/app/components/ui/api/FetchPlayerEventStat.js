const url = "https://zsr.octane.gg/";

const fetchPlayerEventStat = async (playerID, eventID) => {
  try {
    const response = await fetch(
      `${url}stats/players?player=${playerID}&event=${eventID}&stat=rating`
    );
    if (!response.ok) throw new Error(`Error fetching player stats: ${response.statusText}`);

    const data = await response.json();
    if (Array.isArray(data.stats) && data.stats.length > 0) {
      const rating = data.stats[0].stats.rating;
      const totalGames = data.stats[0].games.total;
      return (rating / totalGames).toFixed(3);
    } else {
      throw new Error("No stats found in the response");
    }
  } catch (err) {
    console.log(err.message);
    return "Error fetching rating";
  }
};

export default fetchPlayerEventStat;
