const url = "https://zsr.octane.gg/";

const fetchPlayerEventsOverview = async (id) => {
  try {
    const response = await fetch(
      `${url}stats/players/events?player=${id}&stat=rating`
    );
    if (!response.ok)
      throw new Error(`Error fetching player stats: ${response.statusText}`);
    const data = await response.json();
    return data.stats;
  } catch (err) {
    console.log(err.message);
  }
};

export default fetchPlayerEventsOverview;
