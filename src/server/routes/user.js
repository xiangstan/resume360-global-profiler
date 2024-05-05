const express = require("express");
const userRouter = express.Router();
const { dbQueryValidate } = require("../utils/db");
const { createJwtToken, verifyJwtToken } = require("../utils/jwt.js");

userRouter.get("/", function(req, res) {
  res.send("Using User API route.");
});

/*** User login API */
userRouter.post("/login", async function(req, res) {
  let result = await checkUser(req.body.user, 1);
  if (dbQueryValidate(result.errno, [1])) {
    /** if this is a new account, create a user record */
    if (result.count < 1) {
      result = await addUser(req.body.user, 100);
      if (dbQueryValidate(result.errno, [100])) {
        result.errmsg = {
          uaid: result.insertedId,
          email: req.body.user,
          rgid: null,
          money: 0,
          disabled: false,
          lvl: 1,
          exp: 0
        }
        result.count = 1;
      }
    }
  }
  /** create a new JWT token */
  if (dbQueryValidate(result.errno, [1, 100])) {
    result.jwt = createJwtToken({
      email: req.body.user,
      browser: req.body.browser,
      ip: req.socket.remoteAddress
    })
  }
  res.status(200).send(result);
});
