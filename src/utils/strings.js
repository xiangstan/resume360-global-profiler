/***
 * capitalize the first letter of the slected word
 */
export const cap1stLetter = (data, ops) => {
  const words = data.split(ops);
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1)
  }
  return words.join(ops)
}
/***
 * hide the middle of text string
 */
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