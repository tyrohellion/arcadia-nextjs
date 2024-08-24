const EventFetchAPI = async (value) => {
  let results = [];

  try {
    let response = await fetch(
      `${"https://api.slokh.gg/events"}?name=${value}`
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (results = data.data);
  } catch (err) {
    console.log(err);
  }
};

export default EventFetchAPI;
