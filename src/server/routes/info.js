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
  const result = await fetchUser(userId, 1);
  if (dbQueryValidate(result.errno, [1])) {
    result.edu = await fetchEdu(userId, 1);
    result.exp = await fetchExp(userId, 1);
  }
  res.status(200).send(result);
});

/*** Export this router to use in our index.js */
module.exports = infoRouter;
