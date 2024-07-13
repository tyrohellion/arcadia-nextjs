import React from "react";

const PrettyDateBigTag = ({ date }) => {
  let dateParts = new Date(date);

  let year = dateParts.getFullYear();
  let month = dateParts.getMonth();
  let num_day = dateParts.getDate();
  let day = dateParts.getDay();
  let timeHours = dateParts.getHours();
  let timeMinutes = dateParts.getMinutes();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthOfYear = monthNames[month];
  let dayOfWeek = dayNames[day];

  if (timeMinutes == 0) {
    timeMinutes = "00";
  }

  if ((timeMinutes < 10) & (timeMinutes > 0)) {
    timeMinutes = "0" + timeMinutes;
  }

  if (timeHours > 12) {
    timeHours = timeHours - 12 + ":" + timeMinutes + " PM";
  }

  if (timeHours < 12) {
    timeHours = timeHours + ":" + timeMinutes + " AM";
  }

  if (timeHours == 12) {
    timeHours = timeHours + ":" + timeMinutes + " PM";
  }

  var prettyDate =
    dayOfWeek +
    ", " +
    monthOfYear +
    " " +
    num_day +
    ", " +
    year +
    " @" +
    timeHours;

  return <p className="date-tag">{prettyDate}</p>;
};

export default PrettyDateBigTag;
