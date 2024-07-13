const prettyDate = (date) => {
  let dateParts = new Date(date);

  let year = dateParts.getFullYear();
  let month = dateParts.getMonth();
  let num_day = dateParts.getDate();
  let day = dateParts.getDay();

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

  let prettyDate =
    dayOfWeek +
    ", " +
    monthOfYear +
    " " +
    num_day +
    ", " +
    year

  return prettyDate;
};

export default prettyDate;
