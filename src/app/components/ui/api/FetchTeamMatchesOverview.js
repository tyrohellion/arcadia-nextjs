const url = "https://zsr.octane.gg/";

const FetchTeamMatchesOverview = async (id) => {
  try {
    const response = await fetch(
      `${url}matches?team=${id}&sort=date:desc&perPage=20`
    );
    if (!response.ok)
      throw new Error(`Error fetching player stats: ${response.statusText}`);
    const data = await response.json();
    return data.matches;
  } catch (err) {
    console.log(err.message);
  }
};

export default FetchTeamMatchesOverview;