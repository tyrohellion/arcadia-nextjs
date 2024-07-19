const url = "https://zsr.octane.gg/";

const EventFetchAPI = async (value) => {
  let results = [];

  try {
    let response = await fetch(`${"https://zsr.octane.gg/events"}?name=${value}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (results = data.events);
  } catch (err) {
    console.log(err);
  }
};

export default EventFetchAPI;
