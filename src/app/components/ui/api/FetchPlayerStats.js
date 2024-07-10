const url = "https://zsr.octane.gg/";

const getPlayerStats = async (stat) => {

  try {
    let response = await fetch(url + "stats/players");
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (data);
  } catch (err) {
    console.log(err);
  }
};

export default getPlayerStats;
