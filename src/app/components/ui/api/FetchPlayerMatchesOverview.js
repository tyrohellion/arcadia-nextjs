const url = "https://zsr.octane.gg/";

const FetchPlayerMatchesOverview = async (id) => {
  try {
    const response = await fetch(
      `${url}matches?player=${id}&sort=date:desc`
    );
    if (!response.ok)
      throw new Error(`Error fetching player stats: ${response.statusText}`);
    const data = await response.json();
    return data.matches;
  } catch (err) {
    console.log(err.message);
  }
};

export default FetchPlayerMatchesOverview;