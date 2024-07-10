const url = "https://zsr.octane.gg/";

const getActiveRoster = async (id) => {

  try {
    let response = await fetch(`${url + "players"}?team=${id}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (data.players);
  } catch (err) {
    console.log(err);
  }
};

export default getActiveRoster;
