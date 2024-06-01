const express = require("express");
const infoRouter = express.Router();
const { fetchEdu } = require("../functions/education");
const { fetchExp } = require("../functions/experience.js");
const { fetchUser } = require("../functions/user.js")
const { dbQueryValidate } = require("../utils/db");

infoRouter.get("/", function(req, res) {
  res.send("Using Info API route.");
});

/*** User Detail Fetch API */
infoRouter.get("/user/:userId", async function(req, res) {
  // Access the user_id using req.params
  const userId = req.params.userId;
  const result = {
    edu: [],
    exp: []
  };
  const edu = await fetchEdu(userId, 1, true);
  if (dbQueryValidate(edu.errno, [1])) {
    result.edu = edu.errmsg[0];
  }
  const exp = await fetchExp(userId, 1, true);
  if (dbQueryValidate(exp.errno, [1])) {
    result.exp = exp.errmsg[0];
  }
  res.status(200).send(result);
});

/*** Export this router to use in our index.js */
module.exports = infoRouter;
