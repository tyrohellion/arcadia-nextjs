const featuredEvents = async () => {
  let results = [];

  try {
    let response = await fetch(
      "https://zsr.octane.gg/events?sort=date:desc&tier=S&perPage=5"
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    return (results = data.events);
  } catch (err) {
    console.log(err);
  }
};

export default featuredEvents;
