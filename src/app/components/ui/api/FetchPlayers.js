const url = "https://zsr.octane.gg/";

const PlayerFetchAPI = async (value) => {
  let results = [];

  try {
    let response = await fetch(`${url + "players"}?tag=${value}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (results = data.players);
  } catch (err) {
    console.log(err);
  }
};

export default PlayerFetchAPI;
