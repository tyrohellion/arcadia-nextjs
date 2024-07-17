const url = "https://zsr.octane.gg/";

const PlayerFetchWithFiltersAPI = async (tag, country) => {
  let results = [];

  try {
    let response = await fetch(
      url + `players?tag=${tag}&country=${country}`
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (results = data.players);
  } catch (err) {
    console.log(err);
  }
};

export default PlayerFetchWithFiltersAPI;
