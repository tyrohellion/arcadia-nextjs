const url = "https://zsr.octane.gg/";

const TeamFetchAPI = async (value) => {
  let results = [];

  try {
    let response = await fetch(`${url + "teams"}?name=${value}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (results = data.teams);
  } catch (err) {
    console.log(err);
  }
};

export default TeamFetchAPI;
