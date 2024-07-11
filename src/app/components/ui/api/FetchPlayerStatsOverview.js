const url = "https://zsr.octane.gg/";

const getPlayerStatsOverview = async (id, time) => {

  try {
    const response = await fetch(
      `${url}stats/players?player=${id}&stat=rating&stat=goals&stat=score&stat=shots&stat=assists&stat=goalParticipation&after=${time}`
    );
    if (!response.ok)
      throw new Error(`Error fetching player stats: ${response.statusText}`);

    const data = await response.json();
    console.log(data)
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export default getPlayerStatsOverview;
