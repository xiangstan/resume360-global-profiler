const fs = require('fs');
const stream = require('stream');
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

  async uploadFile(imageData, uaid, email, format) {
    const options = {
      pinataMetadata: {
        name: `User${uaid}Profile.${format}`,
        keyvalues: {
          email: email,
          uaid: uaid
        }
      },
      pinataOptions: {
        cidVersion: 0
      }
    }
    /*** Convert base64 image data to Buffer */
    const imageBuffer = Buffer.from(imageData, 'base64');
    // Create a readable stream from the buffer
    const readableStream = new stream.Readable();
    readableStream._read = () => {}; // _read is required but you can noop it
    readableStream.push(imageBuffer);
    readableStream.push(null); // Signal the end of the stream
    try {
      const result = await this.pinata.pinFileToIPFS(readableStream, options);
      if (result && typeof result.IpfsHash !== 'undefined' && result.IpfsHash.length > 0) {
        return {
          errno: 101,
          value: result
        };
      }
      else {
        return {
          errno: -1,
          status: 'danger'
        }
      }
    }
    catch (error) {
      console.log(error)
    }

  }
}

module.exports = pinataFunc;
