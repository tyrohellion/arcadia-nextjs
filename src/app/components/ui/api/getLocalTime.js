export default function getLocalDateMinusMonths(months) {
  const now = new Date();

  let year = now.getFullYear();
  let month = now.getMonth() - months;
  let day = now.getDate();

  let formattedDate = (year + "-" + (month + 1) + "-" + day);

  return formattedDate;
}

//default format
//7/10/2024, 4:01:02 PM
