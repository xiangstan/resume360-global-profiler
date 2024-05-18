// Use the api keys by providing the strings directly 
const pinataSDK = require('@pinata/sdk');

class pinataFunc {
  constructor(apiKey, apiSecret) {
    this.pinata = new pinataSDK(apiKey, apiSecret);
  }

  testAuthentication() {
    pinata.testAuthentication().then((result) => {
      console.log(result);
      return result;
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }
}

module.exports = pinataFunc;
