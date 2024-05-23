const pinataFunc = require('../utils/pinata');
const { dbQueryValidate } = require('../utils/db');
const { updateUser } = require('./user');

const { PINATA_KEY, PINATA_SECRET } = process.env;
const pinata = new pinataFunc(PINATA_KEY, PINATA_SECRET);

/*** upload images */
const uploadImage = async (val) => {
  try {
    // Extract the image format
    const matches = val.value.match(/^data:image\/(png|jpeg|jpg|webp);base64,/);
    if (!matches) {
      console.error('Invalid base64 image format');
      return {
        errno: 103,
        note: 'Uploaded image',
        status: 'danger'
      }
    }
    else {
      const imageFormat = matches[1]; // 'png', 'jpeg', 'jpg', 'webp'
      const base64Data = val.value.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
      let result = await pinata.uploadFile(base64Data, val.uaid, val.user, imageFormat);
      if (dbQueryValidate(result.errno, [101])) {
        console.log(result)
        result = await updateUser({
          email: val.user,
          method: 'img',
          uaid: val.uaid,
          value: result.value.IpfsHash
        });
      }
      else {
        result = {
          errno: 9996
        }
      }
      return result;
    }
  }
  catch (error) {
    console.error('Error uploading image:', error);
    return {
      errno: 9997,
      error: 'Internal Server Error'
    };
  }
  return val;
}

module.exports = {
  uploadImage
}