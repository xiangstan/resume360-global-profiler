const express = require("express");
const userRouter = express.Router();
const { addUser, fetchUser } = require("../functions/user.js")
const { dbQueryValidate } = require("../utils/db");
const { createJwtToken, validateAuthSession, verifyJwtToken } = require("../utils/jwt.js");

userRouter.get("/", function(req, res) {
  res.send("Using User API route.");
});

/*** User login API */
userRouter.post("/login", async function(req, res) {
  let result = await fetchUser(req.body.user, 1);
  if (dbQueryValidate(result.errno, [1])) {
    /** if this is a new account, create a user record */
    if (result.count < 1) {
      result = await addUser(req.body.user, 100);
      if (dbQueryValidate(result.errno, [100])) {
        result.errmsg = {
          uaid: result.insertedId,
          email: req.body.user
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

/*** verify user logged in status */
userRouter.post("/verify", async function(req, res) {
  const bear = req.headers.authorization;
  const token = bear.split(' ')[1];
  const data = verifyJwtToken(token);
  if (validateAuthSession(req)) {
    const result = await fetchUser(req.body.user, 1);
    res.status(200).send({
      errmsg: result.errmsg,
      errno: 1
    })
  }
  else {
    res.status(200).send({
      errno: 103,
      note: "Login session",
      data: data.errmsg,
      req: req.body
    })
  }
}) 

//export this router to use in our index.js
module.exports = userRouter;