/***
 * duplicate object
 */
export const objClone = (obj, target = {}, prefix = '') => {
  for (let prop in obj) {
    target[prop] = obj[prop];
    if (prefix.length > 0) {
      target[prefix + prop] = obj[prop];
    }
  }
  return target
}