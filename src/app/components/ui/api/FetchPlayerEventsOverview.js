const url = "https://zsr.octane.gg/";

const fetchPlayerEventsOverview = async (id, time) => {
  try {
    const response = await fetch(
      `${url}stats/players/events?player=${id}&stat=rating&after=${time}&perPage=5`
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
