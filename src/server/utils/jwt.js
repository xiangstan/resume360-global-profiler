const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

/***
 * generate JWT token
 */
const createJwtToken = (payload) => {
  try {
    const token = jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: "1d"
      }
    );
    return {
      errmsg: token,
      errno: 1
    };
  }
  catch (error) {
    console.error(error);
    return {
      errmsg: error,
      errno: -1
    };
  }
}

/***
 * verify JWT token
 */
const verifyJwtToken = (token) => {
  try {
    const decorded = jwt.verify(token, secretKey)
    return {
      errmsg: decorded,
      errno: 1
    };
  }
  catch (error) {
    return {
      errmsg: error,
      errno: -1
    };
  }
}

module.exports = {
  createJwtToken,
  verifyJwtToken
}