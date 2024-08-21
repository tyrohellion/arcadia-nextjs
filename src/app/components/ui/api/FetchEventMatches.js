const url = "https://api.slokh.gg/";

const FetchEventMatchesOverview = async (id, sort) => {
  try {
    const response = await fetch(
      `${url}matches?event=${id}&sort=date&order=${sort}`
    );
    if (!response.ok)
      throw new Error(`Error fetching player stats: ${response.statusText}`);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export default FetchEventMatchesOverview;
