const url = "https://api.slokh.gg/";

const FetchPlayerMatchesOverview = async (id) => {
  try {
    const response = await fetch(
      `${url}matches?player=${id}&sort=date&order=desc&perPage=5`
    );
    if (!response.ok)
      throw new Error(`Error fetching player matches: ${response.statusText}`);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export default FetchPlayerMatchesOverview;