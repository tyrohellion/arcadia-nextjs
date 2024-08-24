const url = "https://api.slokh.gg/";

const getActiveRoster = async (id) => {

  try {
    let response = await fetch(`${url + "players"}?team=${id}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (data);
  } catch (err) {
    console.log(err);
  }
};

export default getActiveRoster;
