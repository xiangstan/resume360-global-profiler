const pinataFunc = require('../utils/pinata');
const { dbQueryValidate } = require('../utils/db');

const { PINATA_KEY, PINATA_SECRET } = process.env;
const pinata = new pinataFunc(PINATA_KEY, PINATA_SECRET);

/*** Upload resume */
const uploadResume = async (val) => {
  const metaData = {
    "description": `This is a NFT of ${val.name}'s resume. Created by Resume360 Global Profiler.`,
    "image": `https://ipfs.io/ipfs/${val.image}`,
    "name": `${val.name}'s Resume`,
    "attributes": [
      {
        "trait_type": "Abstract",
        "value": val.abstract
      }
    ]
  }
  let result = await pinata.uploadNftFile(metaData, val.name);
  // if (dbQueryValidate(result.errno, [104])) {
  //   console.log(result)
  //   // do something
  // }
  // else {
  //   result = {
  //     errno: 9996
  //   }
  // }
  return result;
}

module.exports = {
  uploadResume
}