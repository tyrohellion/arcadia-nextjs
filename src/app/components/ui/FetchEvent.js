const url = "https://zsr.octane.gg/";

const getEventByID = async (key) => {

  try {
    let response = await fetch(url + "events/" + key);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (data);
  } catch (err) {
    console.log(err);
  }
};

export default getEventByID;
