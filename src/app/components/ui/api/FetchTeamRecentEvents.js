const url = "https://zsr.octane.gg/";

const FetchTeamRecentEvents = async (id) => {
  let matchesData = [];
  let eventData = [];
  let finalResult = [];

  try {
    const response = await fetch(`${url}matches?team=${id}&sort=date:desc`);
    if (!response.ok)
      throw new Error(`Error fetching player stats: ${response.statusText}`);
    const data = await response.json();
    matchesData = data.matches;
  } catch (err) {
    console.log(err.message);
  }

  const constructEventArray = (matchesData) => {
    matchesData.forEach((match) => {
      if (eventData.length < 4) {
        if (eventData.length === 0) {
          eventData.push(match.event._id);
        } else if (!eventData.includes(match.event._id)) {
          eventData.push(match.event._id);
        }
      }
    });
  };

  constructEventArray(matchesData);

  const getEventDatas = async (eventData) => {
    try {
      const promises = eventData.map(async (eventId) => {
        const response = await fetch(`${url}events/${eventId}`);
        if (!response.ok)
          throw new Error(`Error fetching event data: ${response.statusText}`);
        const recentTeamEvents = await response.json();
        return recentTeamEvents;
      });
      finalResult = await Promise.all(promises);
    } catch (err) {
      console.log(err.message);
    }
  };

  await getEventDatas(eventData);

  console.log(finalResult)
  return finalResult;
};

export default FetchTeamRecentEvents;
