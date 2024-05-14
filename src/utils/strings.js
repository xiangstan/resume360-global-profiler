export const shortenString = (str) => {
  if (str.length > 10) {
    // Extract the first four characters
    const firstFour = str.substring(0, 6);
    // Extract the last four characters
    const lastFour = str.substring(str.length - 4);
    // Create the middle portion with ' ... '
    const middlePortion = ' ... ';
    // Concatenate the parts together
    const shortenedString = firstFour + middlePortion + lastFour;
    return shortenedString;
  }
  else {
    return str;
  }
}