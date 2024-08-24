const url = "https://api.slokh.gg/";

const getFormerMembers = async (id) => {
  let formerBeforeList = [];
  let activeRoster = [];

  const formerBefore = async (id) => {
    try {
      const response = await fetch(`${url}stats/teams?team=${id}&stat=goals`);
      if (!response.ok)
        throw new Error(
          `Error fetching former members: ${response.statusText}`
        );

      const data = await response.json();
      formerBeforeList = data[0].players;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getActiveRoster = async (id) => {
    try {
      const response = await fetch(`${url}players?team=${id}`);
      if (!response.ok)
        throw new Error(`Error fetching active roster: ${response.statusText}`);
      const data = await response.json();
      activeRoster = data.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  await formerBefore(id);
  await getActiveRoster(id);

  const compareLists = (formerBeforeList, activeRoster) => {
    const activePlayerIds = new Set(activeRoster.map((player) => player._id));
    return formerBeforeList.filter(
      (player) => !activePlayerIds.has(player._id)
    );
  };

  console.log(compareLists(formerBeforeList, activeRoster));
  return compareLists(formerBeforeList, activeRoster);
};

export default getFormerMembers;
