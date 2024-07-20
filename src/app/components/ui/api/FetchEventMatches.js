const url = "https://zsr.octane.gg/";

const FetchEventMatchesOverview = async (id, sort) => {
  try {
    const response = await fetch(
      `${url}matches?event=${id}&sort=date:${sort}`
    );
    if (!response.ok)
      throw new Error(`Error fetching player stats: ${response.statusText}`);
    const data = await response.json();
    return data.matches;
  } catch (err) {
    console.log(err.message);
  }
};

export default FetchEventMatchesOverview;