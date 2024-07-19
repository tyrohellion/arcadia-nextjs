const url = "https://zsr.octane.gg/";

const getTeamStatsOverview = async (id, time) => {

  try {
    const response = await fetch(
      `${url}stats/teams?team=${id}&stat=goals&stat=shots&stat=score&after=${time}`
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

export default getTeamStatsOverview;
