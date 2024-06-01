const express = require("express");
const resumeRouter = express.Router();
const { fetchEdu, updateEdu } = require("../functions/education");
const { fetchExp, updateExp } = require("../functions/experience.js");
const { getAbstract } = require('../functions/ai.js');
const { uploadImage } = require("../functions/image.js");
const { uploadResume } = require("../functions/publish");
const { validateAuthSession } = require("../utils/jwt.js");

resumeRouter.get("/", function(req, res) {
  res.send("Using Resume API route.");
});

/*** Generate Abastract */
resumeRouter.post('/abstract', async function(req, res) {
  if (validateAuthSession(req)) {
    const result = await getAbstract(req.body);
    return res.status(200).send(result);
  }
  else {
    res.status(200).send({
      errno: 103,
      note: "Login session",
      req: req.body
    })
  }
});

/*** Resume Fetch API */
resumeRouter.post("/fetch", async function(req, res) {
  const result = {
    edu: await fetchEdu(req.body.uaid, 1),
    exp: await fetchExp(req.body.uaid, 1)
  }
  res.status(200).send(result);
});

/*** publish resume */
resumeRouter.post("/publish", async function(req, res) {
  if (validateAuthSession(req)) {
    const result = await uploadResume(req.body);
    return res.status(200).send(result);
  }
  else {
    res.status(200).send({
      errno: 103,
      note: "Login session",
      req: req.body
    })
  }
})

/*** update user resume information */
resumeRouter.post("/update", async function(req, res) {
  if (validateAuthSession(req)) {
    let result = {};
    const updateMethods = {
      "exp": async () => await updateExp(req.body),
      "edu": async () => await updateEdu(req.body)
    };
    const method = req.body.method; // Get the method from the request body

    if (updateMethods[method]) {
      result = await updateMethods[method]();
    }
    else {
      return res.status(400).send({
        errno: 9996,
        req: req.body
      });
    }
    return res.status(200).send(result);
  }
  else {
    res.status(200).send({
      errno: 103,
      note: "Login session",
      req: req.body
    })
  }
});

resumeRouter.post("/upload", async function(req, res) {
  if (validateAuthSession(req)) {
    const result = await uploadImage(req.body);
    return res.status(200).send(result);
  }
  else {
    res.status(200).send({
      errno: 103,
      note: "Login session",
      req: req.body
    })
  }
});

/*** Export this router to use in our index.js */
module.exports = resumeRouter;