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
 * verify authorization paramters
 */
const validateAuthSession = (req) => {
  const bear = req.headers.authorization;
  const token = bear.split(' ')[1];
  const data = verifyJwtToken(token);
  const ip = req.socket.remoteAddress;
  if (+data.errno === 1 && data.errmsg.browser === req.body.browser && data.errmsg.ip === ip && data.errmsg.email === req.body.user) {
    return true
  }
  else {
     return false
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
  validateAuthSession,
  verifyJwtToken
}