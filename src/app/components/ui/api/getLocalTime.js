export default function getLocalDateMinusMonths(months) {
  const now = new Date();

  let year = now.getFullYear();
  let month = now.getMonth() + 1 - months;
  let day = now.getDate();

  while (month <= 0) {
    month += 12;
    year -= 1;
  }

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

//default format
//7/10/2024, 4:01:02 PM
