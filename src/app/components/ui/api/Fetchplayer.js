const url = "https://zsr.octane.gg/";

const getPlayerByID = async (key) => {

  try {
    let response = await fetch(url + "players/" + key);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (data);
  } catch (err) {
    console.log(err);
  }
};

export default getPlayerByID;
