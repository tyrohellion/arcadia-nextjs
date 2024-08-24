const url = "https://api.slokh.gg/";

const getTeamStatsOverview = async (id) => {

  try {
    const response = await fetch(
      `${url}stats/teams?team=${id}&stat=goals&stat=shots&stat=score`
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
