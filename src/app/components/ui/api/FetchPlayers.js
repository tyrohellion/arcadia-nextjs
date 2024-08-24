const url = "https://api.slokh.gg/";

const PlayerFetchAPI = async (value) => {
  let results = [];

  try {
    let response = await fetch(`${url + "players"}?tag=${value}&perPage=100`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (results = data.data);
  } catch (err) {
    console.log(err);
  }
};

export default PlayerFetchAPI;
