// add the leading zero if value is less than 10
const addLeadingZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

/*** convert date to yyyy-mm-yy */
export const convertToDateOnly = (datetime) => {
  const dateTime = new Date(datetime);
  // Adding 1 because getMonth() returns zero-based month (0 for January)
  const month = addLeadingZero(dateTime.getMonth() + 1);
  const day = addLeadingZero(dateTime.getDate());
  const year = dateTime.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}