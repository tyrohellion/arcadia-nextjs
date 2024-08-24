const url = "https://api.slokh.gg/";

const getMatchByID = async (key) => {

  try {
    let response = await fetch(url + "matches/" + key);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (data);
  } catch (err) {
    console.log(err);
  }
};

export default getMatchByID;
