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

  /*** Set Pinata options */
  setPinataOptions(name, keys) {
    const options = {
      pinataMetadata: {
        name: name,
        keyvalues: {}
      },
      pinataOptions: {
        cidVersion: 0
      }
    }
    // Copy key-value pairs from keys to options.pinataMetadata.keyvalues
    Object.assign(options.pinataMetadata.keyvalues, keys);
    return options;
  }

  /*** Upload an image to Pinata */
  async uploadImgFile(imageData, uaid, email, format) {
    const options = this.setPinataOptions(`User${uaid}Profile.${format}`, { email: email, uaid: uaid });
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
          errmsg: 'The image has uploaded to Pinata, but did not return the PIFS hash',
          errno: -1,
          status: 'danger'
        }
      }
    }
    catch (error) {
      console.log(error)
      return {
        errmsg: 'The image did not uploaded to Pinata successfully',
        errno: -1,
        status: 'danger'
      }
    }
  }

  /*** Upload NFT Metadata to Pinata */
  async uploadNftFile(json, name) {
    const options = this.setPinataOptions(`${name} Resume MetaData`, { name: name });
    try {
      const result = await this.pinata.pinJSONToIPFS(json, options);
      if (result && typeof result.IpfsHash !== 'undefined' && result.IpfsHash.length > 0) {
        return {
          errno: 105,
          value: result
        };
      }
      else {
        return {
          errmsg: 'The image has uploaded to Pinata, but did not return the PIFS hash',
          errno: -1,
          status: 'danger'
        }
      }
    }
    catch (error) {
      console.log(error)
      return {
        errmsg: 'The image did not uploaded to Pinata successfully',
        errno: -1,
        status: 'danger'
      }
    }
  }
}

module.exports = pinataFunc;
