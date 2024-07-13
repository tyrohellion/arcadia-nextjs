const prettyTime = (date) => {
  let dateParts = new Date(date);
  let timeHours = dateParts.getHours();
  let timeMinutes = dateParts.getMinutes();

  if (timeMinutes == 0) {
    timeMinutes = "00";
  }

  if ((timeMinutes < 10) & (timeMinutes > 0)) {
    timeMinutes = "0" + timeMinutes;
  }

  if (timeHours > 12) {
    timeHours = timeHours - 12 + ":" + timeMinutes + "PM";
  }

  if (timeHours < 12) {
    timeHours = timeHours + ":" + timeMinutes + "AM";
  }

  if (timeHours == 12) {
    timeHours = timeHours + ":" + timeMinutes + "PM";
  }

  return "@" + timeHours;
};

export default prettyTime