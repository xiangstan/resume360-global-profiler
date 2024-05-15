const express = require("express");
const resumeRouter = express.Router();
const { fetchExp, fetchEdu } = require("../functions/resume");
// const { dbQueryValidate } = require("../utils/db");

resumeRouter.get("/", function(req, res) {
  res.send("Using Resume API route.");
});

/*** Resume Fetch API */
resumeRouter.post("/fetch", async function(req, res) {
  const result = {
    edu: await fetchEdu(req.body.uaid, 1),
    exp: await fetchExp(req.body.uaid, 1)
  }
  res.status(200).send(result);
});


/*** Export this router to use in our index.js */
module.exports = resumeRouter;