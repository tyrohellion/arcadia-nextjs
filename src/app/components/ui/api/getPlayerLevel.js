const url = "https://zsr.octane.gg/";

const getPlayerLevel = async (id, time) => {
  try {
    const response = await fetch(
      `${url}stats/players/events?player=${id}&stat=rating&after=${time}`
    );
    if (!response.ok) throw new Error(`Error fetching player stats: ${response.statusText}`);

    const data = await response.json();
    console.log(data)

    if (Array.isArray(data.stats) && data.stats.length > 0) {
      const allTiers = data.stats.flatMap(stat => stat.events.map(event => event.tier));
      const highestTier = getHighestTier(allTiers);
      return highestTier;
    }
    
    return "No events found";
  } catch (err) {
    console.log(err.message);
    return "Error fetching data";
  }
};

const getHighestTier = (tiers) => {
  const tierOrder = ["S"];
  for (let tier of tierOrder) {
    if (tiers.includes(tier)) {
      return "Verified";
    }
  }
  return "Unverified";
};

export default getPlayerLevel;
