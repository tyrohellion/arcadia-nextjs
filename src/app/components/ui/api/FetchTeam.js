const url = "https://api.slokh.gg/";

const getTeamByID = async (key) => {

  try {
    let response = await fetch(url + "teams/" + key);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (data);
  } catch (err) {
    console.log(err);
  }
};

export default getTeamByID;
