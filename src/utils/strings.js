/*** capitalize the first letter of the slected word */
export const cap1stLetter = (data, ops) => {
  const words = data.split(ops);
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1)
  }
  return words.join(ops)
}
/*** convert all \n inside a string to <br /> */
export const nToBr = (str) => {
  if (typeof str !== 'string' || str.length < 1) {
    return '';
  }
  return str.replace(/\n/g, '<br>');
}
/*** hide the middle of text string */
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
/*** if a string has more than 63 characters, truncate it to 60 and add ... at the end */
export const truncateString = (str = '') => {
  // Check if the string length is more than 63 characters
  if (str.length > 63) {
    // Return the first 60 characters followed by '...'
    return str.slice(0, 60) + '...';
  } else {
    // If the string is 63 characters or less, return it as is
    return str;
  }
}
/*** display character count of textarea */ 
export const textCount = (text, max) => {
  let count = 0
  if (typeof text !== "undefined" && text !== null) {
    count = text.length
  }
  else {
    count = 0
  }
  return count + " / " + max
}