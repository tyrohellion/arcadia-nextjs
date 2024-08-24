const url = "https://api.slokh.gg/";

const getPlayerStatsOverview = async (id) => {

  try {
    const response = await fetch(
      `${url}stats/players?player=${id}&stat=rating&stat=goals&stat=score&stat=shots&stat=assists&stat=goalParticipation`
    );
    if (!response.ok)
      throw new Error(`Error fetching player stats: ${response.statusText}`);

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export default getPlayerStatsOverview;
